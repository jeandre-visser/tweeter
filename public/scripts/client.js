/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// WHEN DOM is loaded and ready
$(document).ready(() => {

// Template literal
  const createTweetElement = function(tweetData) {

    const $tweet = $('<article>').addClass('tweet');
    const timeSinceTweet = (Date.now() - tweetData.created_at) / 86400000;

    const htmlTemplate = `
      <header>
        <img src=${tweetData.user.avatars} alt="${tweetData.user.handle}-avatar">
        <span>${tweetData.user.name}</span>
        <span>${tweetData.user.handle}</span>
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
  }


  // Takes in an array of tweet objects and then appends each one to the #tweets-container
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet))
    }
  };


  // TEST
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }
  
  const $tweet = createTweetElement(tweetData);
  

  console.log($tweet); 
  $('#tweets-container').append($tweet); 
})


