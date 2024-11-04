// content.js
import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(message => {
  console.log('got message', message);
  if (message.type === 'getColorScheme') {
    return Promise.resolve(getColorScheme());
  }
});

function getColorScheme() {
  let scheme = 'light';
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  if (darkModeMediaQuery.matches) {
    scheme = 'dark';
  }
  return scheme;
}