$(document).ready(() => {

  // detect scrolling
  $(window).scroll(function() {

    // conditions for whether at top of page or not, determines if navbar or scroll up button is shown

    if ($(this).scrollTop() < 90) {
      $('nav').fadeIn(200);
      $('.scroll-up').fadeOut(200);

    } else {
      $('nav').fadeOut(100);
      $('.scroll-up').fadeIn(200);
    }
  })

  // when scroll-up button is pressed, page goes back to top and focuses on the new-tweet form
  $('.scroll-up').click(() => {
    $(window).scrollTop(0)
    $('.new-tweet').slideDown();
    $('.new-tweet textarea').focus();
  })
})