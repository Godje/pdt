function toggleClass(el, _class) {
  if (el && el.className && el.className.indexOf(_class) >= 0) {
    var pattern = new RegExp('\\s*' + _class + '\\s*');
    el.className = el.className.replace(pattern, ' ');
  }
  else if (el){
    el.className = el.className + ' ' + _class;
  }
  else {
    console.log("Element not found :(")
  }
}

window.onload = function(){
  var navBtn = document.getElementById("nav-btn");

  navBtn.addEventListener("click", function(){
    toggleClass(navBtn, "active")
  }, false);
}
