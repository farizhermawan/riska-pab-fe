(function ($) {
  "use strict"; // Start of use strict

  // Closes the sidebar menu
  $(".menu-toggle").click(function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    $(this).toggleClass("active");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('#sidebar-wrapper .js-scroll-trigger').click(function () {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

})(jQuery); // End of use strict

// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function (event) {
  var that = $(this);
  that.on('click', onMapClickHandler);
  that.off('mouseleave', onMapMouseleaveHandler);
  that.find('iframe').css("pointer-events", "none");
}
var onMapClickHandler = function (event) {
  var that = $(this);
  // Disable the click handler until the user leaves the map area
  that.off('click', onMapClickHandler);
  // Enable scrolling zoom
  that.find('iframe').css("pointer-events", "auto");
  // Handle the mouse leave event
  that.on('mouseleave', onMapMouseleaveHandler);
}
// Enable map zooming with mouse scroll when the user clicks the map
$('.map').on('click', onMapClickHandler);

var gallery = blueimp.Gallery([
  {
    title: 'PAB RISKA',
    href: 'assets/images/pab20201.jpg',
    type: 'image/jpeg',
    thumbnail: 'images/pab20201.jpg'
  },
  {
    title: 'RISKA MENTENG',
    href: 'https://www.youtube.com/watch?v=80hvKzTwFBs',
    type: 'text/html',
    youtube: '80hvKzTwFBs',
    poster: 'http://i3.ytimg.com/vi/80hvKzTwFBs/maxresdefault.jpg'
  }
], {
  container: '#blueimp-gallery-carousel',
  carousel: true
});

$.getJSON( "/portal/api/batch/current/status", function( data ) {
  $.each( data.programs, function( key, val ) {
    var quota = val.quota;
    var used = val.counter_ikhwan + val.counter_akhwat;
    $("#list-dept").append('<div class="col-lg-3 col-md-6 mb-5 mb-lg-0">' +
      '        <span class="service-icon rounded-circle mx-auto mb-3 text-quota">' + (quota - used) + '</span>' +
      '        <h6><strong>' + val.name + '</strong></h6>' +
      '        <p class="text-faded mb-0"></p>' +
      '      </div>');
  });
});