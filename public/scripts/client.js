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

    // CAppends tweet text to the $tweet
    $header.append($('<p>').text(tweetData.content.text));

  }


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


