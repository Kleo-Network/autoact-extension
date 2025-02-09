var contentType = 'contexts',
  scrappedPageData = {
    title: '',
    description: ''
  };
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'openSidePanel') {
    var _sender$tab, _sender$tab2;
    contentType = message.contentType;
    chrome.sidePanel.setOptions({
      enabled: true
    });
    chrome.sidePanel.open({
      windowId: (sender === null || sender === void 0 || (_sender$tab = sender.tab) === null || _sender$tab === void 0 ? void 0 : _sender$tab.windowId) || 0,
      tabId: sender === null || sender === void 0 || (_sender$tab2 = sender.tab) === null || _sender$tab2 === void 0 ? void 0 : _sender$tab2.id
    });
  }
  if (message.action === 'getSidebarContentType') {
    sendResponse({
      contentType: contentType
    });
  }
  if (message.action === 'scrappedPageData') {
    scrappedPageData = message.pageData;
  }
  if (message.action === 'getPageData') {
    sendResponse({
      pageData: scrappedPageData
    });
  }
});
//# sourceMappingURL=background.js.map
