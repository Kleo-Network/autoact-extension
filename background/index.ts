import { getAllContextsFromDB } from '../sidebar/db/utils';

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
            windowId: sender.tab?.windowId || 0,
            tabId: sender.tab?.id,
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
        chrome.runtime.sendMessage({ action: 'updatePageData' });
    }

    if (message.action === 'getPageData') {
        sendResponse({ pageData: scrappedPageData });
    }

    if (message.action === 'captureIframeContent') {
        // Handle cross-origin iframe content capture
        const iframeSrc = message.iframeSrc;
        if (!iframeSrc) {
            sendResponse({ html: '' });
            return;
        }

        // Execute a content script in the iframe to capture its HTML
        // This requires "all_frames": true in manifest.json content scripts
        try {
            chrome.tabs.executeScript(
                sender.tab?.id || 0,
                {
                    code: `
                        Array.from(document.querySelectorAll('iframe'))
                            .filter(iframe => iframe.src === "${iframeSrc}")
                            .map(iframe => {
                                try {
                                    return iframe.contentDocument?.documentElement.outerHTML || '';
                                } catch (e) {
                                    return '';
                                }
                            })[0] || '';
                    `,
                    allFrames: true
                },
                (results) => {
                    // If we got a result, send it back
                    if (results && results.length > 0) {
                        sendResponse({ html: results[0] || '' });
                    } else {
                        sendResponse({ html: '' });
                    }
                }
            );
            return true; // Keep the message channel open for the async response
        } catch (error) {
            console.error('Error executing script in iframe:', error);
            sendResponse({ html: '' });
        }
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

    if (message.action === 'informModalToRefetchContexts') {
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                chrome.tabs.sendMessage(tab.id || 0, {
                    action: 'refetchContexts',
                });
            });
        });
    }
});
