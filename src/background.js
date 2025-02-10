import { getAllContextsFromDB } from './db/utils';

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
            windowId: sender.tab.windowId,
            tabId: sender.tab.id,
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

    if (message.action === 'getContexts') {
        (async () => {
            try {
                const contexts = await getAllContextsFromDB();
                sendResponse({ data: contexts, error: null });
            } catch (error) {
                console.error('Error getting contexts from DB', error);
                sendResponse({
                    data: [],
                    error: 'Error getting contexts from DB',
                });
            }
        })();

        return true;
    }
});
