window.onload = function(){
  var progressLine = document.getElementById("progress-line"),
      body = document.body,
      html = document.documentElement,
      viewportHeight = window.innerHeight;

  var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

  var scrollTopValue = function(){
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }

  window.addEventListener("scroll", function(){
    var scroll = scrollTopValue();
    var progress = (scroll / (documentHeight - viewportHeight))*100;
    progressLine.style.width = progress + "%";
  });

  window.addEventListener("resize", function(){
    documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  });
}
