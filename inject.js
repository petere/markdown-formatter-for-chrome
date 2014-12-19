function show_raw() {
  var evt = document.createEvent('Event');
  evt.initEvent('showRaw', true, false);
  document.dispatchEvent(evt);
}

function show_html() {
  var evt = document.createEvent('Event');
  evt.initEvent('showHtml', true, false);
  document.dispatchEvent(evt);
}
