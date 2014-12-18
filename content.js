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

  pre.className += 'markdown';

  var reader = new commonmark.DocParser();
  var writer = new commonmark.HtmlRenderer();
  var parsed = reader.parse(pre.innerHTML);
  var formatted = document.createElement('div') ;
  formatted.className += 'html';
  formatted.innerHTML = writer.render(parsed);
  formatted.style.display = 'none';
  document.body.insertBefore(formatted, pre);

  var buttons = document.createElement('div');
  buttons.innerHTML = '<a href="javascript:show_raw()">Raw Markdown</a> <a href="javascript:show_html()">HTML</a>';
  document.body.insertBefore(buttons, document.body.firstChild);
});
