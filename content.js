var htmlElement;
var rawElement;

document.addEventListener("DOMContentLoaded", function() {
  var bodyChildren = document.body.childNodes ;
  var pre = bodyChildren[0] ;
  if (bodyChildren.length > 2 || pre.tagName != 'PRE')
    return;

  var s = document.createElement('script');
  s.src = chrome.extension.getURL('inject.js');
  s.onload = function() {
    this.parentNode.removeChild(this);
  };
  (document.head||document.documentElement).appendChild(s);

  rawElement = pre;

  var reader = new commonmark.DocParser();
  var writer = new commonmark.HtmlRenderer();
  var parsed = reader.parse(pre.innerHTML);
  var formatted = document.createElement('div') ;
  formatted.innerHTML = writer.render(parsed);
  htmlElement = formatted;

  var buttons = document.createElement('div');
  buttons.innerHTML = '<a href="javascript:show_raw()">Raw Markdown</a> <a href="javascript:show_html()">HTML</a>';
  document.body.insertBefore(buttons, document.body.firstChild);
});

document.addEventListener('showRaw', function() {
  console.log('showRaw');
  document.body.removeChild(document.body.lastChild);
  document.body.insertBefore(rawElement, null);
});

document.addEventListener('showHtml', function() {
  console.log('showHtml');
  document.body.removeChild(document.body.lastChild);
  document.body.insertBefore(htmlElement, null);
});
