$(document).ready(() => {

  // detect scrolling
  $(window).scroll(function() {

    // conditions for whether at top of page or not, determines if navbar or scroll up button is shown

    if ($(this).scrollTop() === 0) {
      $('nav').show(100);
      $('.scroll-up').hide(200);

    } else {
      $('nav').hide(100);
      $('.scroll-up').show(200);
    }
  })
})