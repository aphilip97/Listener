console.log('Listener background script is running...');
chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.message === 'Loaded-Audio-Info') {
        const { title, src, tracklist } = msg;
        const playlistInfo = { title, src, tracklist };
        setTimeout(() => {
            if (sender.tab?.id) {
                chrome.tabs.sendMessage(sender.tab?.id, playlistInfo);
            }
        }, 500);
    }
});
