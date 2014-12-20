chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request == "show_page_action")
      chrome.pageAction.show(sender.tab.id);
  }
);

chrome.pageAction.onClicked.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "toggle_markdown", function(response) {});
  });
});
