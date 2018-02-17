$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    loop: true,
    center: true,
    margin: 10,
    stagePadding: 20,
    responsive: {
      0: {
        items: 1,
        nav: true,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplaySpeed: 500,
        smartSpeed: 1000
      },
      640: {
        items: 2,
        nav: true,
        autoplay: true,
        autoplayTimeout: 2000
      },
      800: {
        items: 3,
        touchDrag: true,
        loop: false
      }
    }
  })
});
