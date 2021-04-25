console.log('Listener background script is running...');
chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.message === 'Loaded-Audio-Info') {
        const { title, src, ext, tracklist } = msg;
        const playlistInfo = { title, src, ext, tracklist };
        setTimeout(() => {
            if (sender.tab?.id) {
                chrome.tabs.sendMessage(sender.tab?.id, playlistInfo);
            }
        }, 500);
    }
});
