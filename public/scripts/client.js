/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// WHEN DOM is loaded and ready
$(document).ready(() => {

  // takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
  const createTweetElement = tweetData => {
    
    // The returned tweet <article>
    const $tweet = $('<article>').addClass('tweet');
    
    // Create header
    const $header = $('<header>');

    // Appends image
    const $img = $('<img>').attr({
      src: tweetData.user.avatars,
      alt: `${tweetData.user.handle}-avatar`
    });

    // Append the img, name, and handle to the header
    $header.append($img);
    $header.append($('<span>').text(tweetData.user.name));
    $header.append($('<span>').text(tweetData.user.handle));

    // Append header to the tweet
    $tweet.append($header);

    // Appends tweet text to the $tweet
    $header.append($('<p>').text(tweetData.content.text));

    // Append the footer to the $tweet
    const $footer = $('<footer>');

    // Determine how much time since the tweet was posted
    const timeSinceTweet = (Date.now() - tweetData.created_at) / 86400000;

    // add timeSinceTweet to footer
    $footer.text(`${timeSinceTweet} days ago`);

    // Add the icons
    const $icons = $('<span>')
    $icons.append($('<i>').addClass('fas fa-fla'));
    $icons.append($('<i>').addClass('fa-solid fa-retweet'));
    $icons.append($('<i>').addClass('fa-solid fa-heart'));

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


