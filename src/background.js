// background.js
import browser from 'webextension-polyfill';
import { detect } from 'detect-browser';
import settingsConnector from './settings-connector';

console.log('background script running...');

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('got message', message);
  if (message.type === 'gotColorScheme') {
    updateIcon(message.value).then(sendResponse);
    return true;
  }
});

async function updateIcon(colorScheme) {
  console.log('updating icon', colorScheme);
  // do work here
}