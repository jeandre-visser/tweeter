// When DOM finishes loading
$(document).ready(function() {
  // input box for tweeting
  const $textArea = $('.new-tweet textarea')

  // use keyup to increase char counter every time text is inputted
  $textArea.on('keyup', function() {

    // accesses the counter sibling of textArea
    const $charCounter = $('.new-tweet .counter')

    // updates char counter when text is inputted
    const charCountRemaining = 140 - $(this).val().length;

    // displays the number of characters remaining
    $charCounter.text(charCountRemaining);
    
    // make text red if going beyond the 140 char count limit
    if (charCountRemaining < 0) {
      $charCounter.addClass('char-limit-exceeded');

    } else {
      $charCounter.removeClass('char-limit-exceeded');
    }
  })
});
