import { Listen, ListenMessage } from '../types/index';

const pre = document.querySelector('pre');

if (pre) {

  const strJSON = pre.innerText.trim();

  try {

    const playlistInfo: Listen = JSON.parse(strJSON);

    const msg: ListenMessage = {
      message: 'Loaded-Audio-Info',
      ...playlistInfo,
    };
    chrome.runtime.sendMessage(msg);

    window.location.assign(`${playlistInfo.src}`);

  } catch (err) {

    alert('Failed to parse JSON file. Please check the syntax.')

  }

}
