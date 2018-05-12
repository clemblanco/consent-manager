import React from 'react'
import ReactDOM from 'react-dom'
import {ConsentManager, openConsentManager, doNotTrack} from '.'

export React from 'react'
export * from '.'

const dataset = document.currentScript && document.currentScript.dataset

let props = {}
if (window.consentManagerOptions) {
  // Allow using global variable
  if (typeof window.consentManagerOptions === 'function') {
    props = window.consentManagerOptions({
      React,
      openConsentManager,
      doNotTrack
    })
  } else {
    props = window.consentManagerOptions
  }
} else if (dataset) {
  // Allow using data attributes on the script tag
  props.container = dataset.container
  props.writeKey = dataset.writekey
  props.otherWriteKeys = dataset.otherwritekeys
  props.implyConsentOnInteraction = dataset.implyconsentoninteraction
  props.cookieDomain = dataset.cookiedomain
  props.bannerContent = dataset.bannercontent
  props.bannerTextColor = dataset.bannertextcolor
  props.bannerBackgroundColor = dataset.bannerbackgroundcolor
  props.dialogTitle = dataset.dialogtitle
  props.dialogContent = dataset.dialogcontent
}

if (!props.container) {
  throw new Error('ConsentManager: container is required')
}

if (!props.writeKey) {
  throw new Error('ConsentManager: writeKey is required')
}

if (!props.bannerContent) {
  throw new Error('ConsentManager: bannerContent is required')
}

if (!props.dialogTitle) {
  throw new Error('ConsentManager: dialogTitle is required')
}

if (!props.dialogContent) {
  throw new Error('ConsentManager: dialogContent is required')
}

if (typeof props.otherWriteKeys === 'string') {
  props.otherWriteKeys = props.otherWriteKeys.split(',')
}

if (typeof props.implyConsentOnInteraction === 'string') {
  props.implyConsentOnInteraction = props.implyConsentOnInteraction === 'true'
}

const container = document.querySelector(props.container)

if (!container) {
  throw new Error('ConsentManager: container not found')
}

ReactDOM.render(<ConsentManager {...props} />, container)
