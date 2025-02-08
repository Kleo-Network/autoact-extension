let contentType = 'contexts';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openSidePanel') {
        contentType = message.contentType;
        chrome.sidePanel.setOptions({ enabled: true });
        chrome.sidePanel.open({
            windowId: sender.tab.windowId,
            tabId: sender.tab.id,
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getSidebarContentType') {
        sendResponse({ contentType });
    }
});
