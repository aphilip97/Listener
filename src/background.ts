import { Listen, ListenMessage } from '../types/index';

console.log('Listener background script is running...');

chrome.runtime.onMessage.addListener((msg: ListenMessage, sender) => {
  if (msg.message === 'Loaded-Audio-Info') {
    const { title, src, tracklist } = msg;
    const playlistInfo: Listen = { title, src, tracklist };
    setTimeout(() => {
      if (sender.tab?.id) {
        chrome.tabs.sendMessage(sender.tab?.id, playlistInfo);
      }
    }, 500);
  }
});
