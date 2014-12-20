function unescapeHTML(val) {
  return val
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

var htmlElement;
var rawElement;
var showingRaw = true;

document.addEventListener("DOMContentLoaded", function() {
  var bodyChildren = document.body.childNodes ;
  var pre = bodyChildren[0] ;
  if (bodyChildren.length > 2 || pre.tagName != 'PRE')
    return;

  rawElement = pre;

  var reader = new commonmark.DocParser();
  var writer = new commonmark.HtmlRenderer();
  var parsed = reader.parse(unescapeHTML(pre.innerHTML));
  var formatted = document.createElement('div') ;
  formatted.innerHTML = writer.render(parsed);
  htmlElement = formatted;

  chrome.runtime.sendMessage("show_page_action", function(response) {});
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request == "toggle_markdown") {
      showingRaw = !showingRaw;
      document.body.removeChild(document.body.lastChild);
      document.body.insertBefore(showingRaw ? rawElement : htmlElement, null);
    }
  }
);
