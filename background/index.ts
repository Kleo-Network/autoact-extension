console.log("hello from the background/index.ts script");

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((
    message: { action: string },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
) => {
    console.log("message received", message);
    if (message.action === "openSidePanel" && sender.tab) {
        
            console.log("tab", sender.tab);
            console.log("window", sender.tab?.windowId);
            
                        chrome.sidePanel.open({
                            windowId: sender.tab?.windowId,
                            tabId: sender.tab?.id
                        });
                    
            
        
    }
});