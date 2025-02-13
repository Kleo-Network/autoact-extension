import { getAllContextsFromDB } from './db/utils';

let contentType = 'contexts',
    scrappedPageData = {
        title: '',
        description: '',
    },
    isSidePanelOpen = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openSidePanel') {
        contentType = message.contentType;
        isSidePanelOpen = true;

        if (message.notifySidePanel) {
            chrome.runtime.sendMessage({
                action: 'updateSidebarContentType',
                contentType,
            });
        }

        chrome.sidePanel.setOptions({ enabled: true });
        chrome.sidePanel.open({
            windowId: sender.tab.windowId,
            tabId: sender.tab.id,
        });
    }

    if (message.action === 'closeSidePanel') {
        isSidePanelOpen = false;
        chrome.sidePanel.setOptions({ enabled: false });
    }

    if (message.action === 'getSidebarState') {
        sendResponse({ contentType, isSidePanelOpen });
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
