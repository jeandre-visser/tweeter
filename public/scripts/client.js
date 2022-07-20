// Functions 

// Takes a tweet object and returns article element with the composed tweet
const createTweetElement = function(tweetData) {
  // Tweet article element that gets returned
  const $tweet = $('<article>').addClass('tweet');
  
  const timeSinceTweet = (Date.now() - tweetData.created_at) / 86400000;

// Template literal, the tweets inner HTML
  const htmlTemplate = `
    <header>
      <img src=${tweetData.user.avatars} alt="${tweetData.user.handle}-avatar">
      <span class="name" >${tweetData.user.name}</span>
      <span class="handle" >${tweetData.user.handle}</span>
    </header>
    <p>${tweetData.content.text}</p>
    <footer>
      ${Math.round(timeSinceTweet)} days ago
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
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet))
  }
};


// WHEN DOM is loaded and ready
$(document).ready(() => {

  // Event listener for submit and prevents its default behaviour
  $('.new-tweet form').submit(evt => {
    evt.preventDefault();

  // Serialize the form data and send it to the server as a query string
    $.ajax('/tweets', {
      data: $(this).serialize(),
      method: 'POST'
    });
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


