console.log("hello from the background/index.ts script");
chrome.sidePanel.setPanelBehavior({
  openPanelOnActionClick: true
})["catch"](function (error) {
  return console.error(error);
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("message received", message);
  if (message.action === "openSidePanel" && sender.tab) {
    var _sender$tab, _sender$tab2, _sender$tab3;
    console.log("tab", sender.tab);
    console.log("window", (_sender$tab = sender.tab) === null || _sender$tab === void 0 ? void 0 : _sender$tab.windowId);
    chrome.sidePanel.open({
      windowId: (_sender$tab2 = sender.tab) === null || _sender$tab2 === void 0 ? void 0 : _sender$tab2.windowId,
      tabId: (_sender$tab3 = sender.tab) === null || _sender$tab3 === void 0 ? void 0 : _sender$tab3.id
    });
  }
});
//# sourceMappingURL=background.js.map
