// Functions

// escapes unsafe text converts into safe re-encoded text
// tried to use "escape" but says it is deprecated
const escapes = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// Takes a tweet object and returns article element with the composed tweet
const createTweetElement = function(tweetData) {
  // Tweet article element that gets returned
  const $tweet = $('<article>').addClass('tweet');

  const $timeSinceTweet = timeago.format(tweetData.created_at);

  // Template literal, the tweets inner HTML
  const htmlTemplate = `
    <header>
      <img src=${escapes(tweetData.user.avatars)} alt="${escapes(tweetData.user.handle)}-avatar">
      <span class="name" >${escapes(tweetData.user.name)}</span>
      <span class="handle" >${escapes(tweetData.user.handle)}</span>
    </header>
    <p>${escapes(tweetData.content.text)}</p>
    <footer>
      ${$timeSinceTweet} 
      <span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  `;
  // Input the inner HTML into the tweet and return it
  return $tweet.html(htmlTemplate);
};


// Takes in an array of tweet objects and then appends each one to the #tweets-container
const renderTweets = function(tweets) {
  
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};

// Fetch tweets from our 8080 server and render them
const loadTweets = function() {
  $.ajax('/tweets', {
    dataType: 'JSON',
    method: 'GET'
  })
    .then(tweets => renderTweets(tweets))
    .catch(error => console.log(error));
};

// WHEN DOM is loaded and ready
$(document).ready(() => {

  // then load tweets
  loadTweets();
  
  // displays and hides new tweet section when the write a new tweet arrow is clicked"
  $('nav i').on('click', () => {
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').focus();
  });

  // Event listener for submit and prevents its default behavior
  $('.new-tweet form').submit(function(evt) {
    evt.preventDefault();


    const $textarea = $(this).children('textarea');
    const tweetContent = $textarea.val().trim();
    const $errorMessage = $(this).children('h4');



    // hide the error message when there is no error
    $errorMessage.hide();
    
    // show/hide error message if there is/isn't an error
    if (!tweetContent) {
      $('.error-message').text('Please do not leave the tweet field blank');
      $errorMessage.slideDown(200);

    // Too much text
    } else if (tweetContent.length > 140) {
      $('.error-message').text('Please do not exceed the 140 character limit');
      $errorMessage.slideDown(200);
      
      // otherwise serialize the form data and send it to the server as a query string
    } else {
      $.ajax('/tweets', {
        data: $(this).serialize(),
        method: 'POST'
      })
        .then(loadTweets())
        .catch(error => console.log(error));
        
      // clear the textarea and reset counter to 140 after submission
      $textarea.val('');
      $('.counter').text('140');
    }
  });
});


