// import { predictSponsor } from './ai/predictLive.js';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SPONSOR_FOUND" || msg.type === "SPONSOR_NOT_FOUND") {
    chrome.storage.local.set({ videoDescription: msg.payload });

    const links = msg.payload.links || [];
    const count = links.length;

    const isValidOffer = msg.payload.isComplete && !msg.payload.isExpired;

    if (isValidOffer && count > 0) {
      chrome.action.setBadgeText({ text: count.toString() });
      chrome.action.setBadgeBackgroundColor({ color: '#a81111ff' }); 
    } else {
      chrome.action.setBadgeText({ text: '0' });
      chrome.action.setBadgeBackgroundColor({ color: '#808080' }); 
    }
  }

  if (msg.type === "RESET_BADGE") {
    chrome.action.setBadgeText({ text: '0' });
    chrome.action.setBadgeBackgroundColor({ color: '#808080' });
  }
  return true;
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.videoDescription) {
    const newVal = changes.videoDescription.newValue;
    const links = newVal?.links || [];
    const count = links.length;
    const isValidOffer = newVal?.isComplete && !newVal?.isExpired;

    if (isValidOffer && count > 0) {
      chrome.action.setBadgeText({ text: count.toString() });
      chrome.action.setBadgeBackgroundColor({ color: '#a81111ff' });
    } else {
      chrome.action.setBadgeText({ text: '0' });
      chrome.action.setBadgeBackgroundColor({ color: '#808080' });
    }
  }
});

// if (msg.type === "PREDICT_SPONSOR") {
//   const prediction = predictSponsor(msg.text);
//   sendResponse({ prediction });
// }