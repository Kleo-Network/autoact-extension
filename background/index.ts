let contentType = 'contexts',
    scrappedPageData = {
        title: '',
        description: '',
    };

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openSidePanel') {
        contentType = message.contentType;
        chrome.sidePanel.setOptions({ enabled: true });
        chrome.sidePanel.open({
            windowId: sender?.tab?.windowId || 0,
            tabId: sender?.tab?.id,
        });
    }

    if (message.action === 'getSidebarContentType') {
        sendResponse({ contentType });
    }

    if (message.action === 'scrappedPageData') {
        scrappedPageData = message.pageData;
    }

    if (message.action === 'getPageData') {
        sendResponse({ pageData: scrappedPageData });
    }
});
