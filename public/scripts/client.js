/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const sanitizeValue = (value) => {
  const $p = $("<p>");

  $p.text(value);

  return $p.text();
};

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const tweetElement = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $(".tweet-container").prepend(tweetElement);

  } 
    
   
}

const createTweetElement = (tweet) => {
  const { user, name, avatars, handle, content, created_at} = tweet;

  const tweetContent = `
      <article>
        <h1>POST #${user} : ${name, avatars, handle}</h1>
        <p>${sanitizeValue(content)}</p>
        <h2>created at: ${created_at}</h2>
      </article>
  `;

  return tweetContent;
};

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

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('.tweets-container').append($tweet); 