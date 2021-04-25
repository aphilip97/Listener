const pre = document.querySelector('pre');
if (pre) {
    const strJSON = pre.innerText.trim();
    const playlistInfo = JSON.parse(strJSON);
    const msg = {
        message: "Loaded-Audio-Info",
        ...playlistInfo,
    };
    chrome.runtime.sendMessage(msg);
    window.location.assign(`${playlistInfo.src}`);
}
