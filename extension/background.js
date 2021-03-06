chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request == "show_page_action")
      chrome.pageAction.show(sender.tab.id);
  }
);

function send_toggle_markdown() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "toggle_markdown", function(response) {});
  });
}

chrome.pageAction.onClicked.addListener(send_toggle_markdown);

chrome.commands.onCommand.addListener(function(command) {
  if (command == "toggle-markdown")
    send_toggle_markdown();
});
