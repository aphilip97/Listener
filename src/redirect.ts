import { Listen, ListenMessage } from '../types/index';

const pre = document.querySelector('pre');

if (pre) {

  const strJSON = pre.innerText.trim();
  const playlistInfo: Listen = JSON.parse(strJSON);

  const msg: ListenMessage = {
    message: "Loaded-Audio-Info",
    ...playlistInfo,
  };
  chrome.runtime.sendMessage(msg);

  window.location.assign(`${playlistInfo.src}`);

}
