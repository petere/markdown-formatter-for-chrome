function show_raw() {
  document.getElementsByClassName("markdown")[0].style.display = 'block';
  document.getElementsByClassName("html")[0].style.display = 'none';
}

function show_html() {
  document.getElementsByClassName("markdown")[0].style.display = 'none';
  document.getElementsByClassName("html")[0].style.display = 'block';
}
