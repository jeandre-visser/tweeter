// Functions 

// Takes a tweet object and returns article element with the composed tweet
const createTweetElement = function(tweetData) {
  // Tweet article element that gets returned
  const $tweet = $('<article>').addClass('tweet');
  
  const timeSinceTweet = timeago.format(new Date());

// Template literal, the tweets inner HTML
  const htmlTemplate = `
    <header>
      <img src=${tweetData.user.avatars} alt="${tweetData.user.handle}-avatar">
      <span class="name" >${tweetData.user.name}</span>
      <span class="handle" >${tweetData.user.handle}</span>
    </header>
    <p>${tweetData.content.text}</p>
    <footer>
      ${timeSinceTweet} 
      <span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  `
  // Input the inner HTML into the tweet and return it
  return $tweet.html(htmlTemplate);
};


// Takes in an array of tweet objects and then appends each one to the #tweets-container
const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet))
  }
};


// WHEN DOM is loaded and ready
$(document).ready(() => {

  // Event listener for submit and prevents its default behaviour
  $('.new-tweet form').submit(function(evt) {
    evt.preventDefault();

  // Serialize 

    const tweetContent = $(this).children('textarea').val();
      // empty field
      if (!tweetContent) {
        alert('Please enter text in order to submit a tweet')
      
      // Too much text
      } else if (tweetContent.length > 140) {
        alert('Uh oh, your tweet exceeded 140 characters. Too much on your mind!')
      
      // otherwise serialize the form data and send it to the server as a query string
      } else {
        $.ajax('/tweets', {
        data: $(this).serialize(),
        method: 'POST'
        })
        .then(loadTweets())
      }
  })


  // Fetch tweets from our 8080 server and render them
    const loadTweets = function() {
      $.ajax('/tweets', {
        dataType: 'JSON',
        method: 'GET'
      })
      .then(tweets => renderTweets(tweets))
    };

    loadTweets();

})


