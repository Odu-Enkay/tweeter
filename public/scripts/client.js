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

const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

//======== CREATE TWEETS ELEMENTS
const createTweetElement = (tweet) => {
  const { user, content, created_at } = tweet;

  const $article = $("<article>");
  const $username = $("<p>");
  const $avatars = $(`<img src=${user.avatars}>`);
  const $handle = $("<p>");
  const $content = $("<p>");
  const $created = $("<p>");

  $username.text(`${user.name}`);
  $handle.text(`${user.handle}`);
  $content.text(content.text);

  $created.text(
    `Date created: ${Math.round((Date.now() - created_at) / 86400000)}Days ago`
  );

  // Append the tweets
  $article.append($username);
  $article.append($avatars);
  $article.append($handle);
  $article.append($content);
  $article.append($created);

  return $article;
};

//====== RENDER TWEETS ========
const renderTweets = function (tweets) {
  // loops through tweets
  console.log(tweets);
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const tweetElement = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $("#tweet-container").prepend(tweetElement);
  }
};

//===== LOAD TWEET =======
/*(document).ready(function() { 
  const loadTweets = function() {
    
    $.ajax({
      url: '/api/tweets',
      method: 'GET',
      data: 'json'
    })
    .then(function(tweets) {
      renderTweets(tweets);
    })
    .catch(function(error) {
      console.log("Error: ", error);
    });
  }
  loadTweets();
  });*/

$(document).ready(function () {
  const loadTweets = function () {
    $.ajax({
      url: "/api/tweets", // Endpoint to get tweets
      method: "GET", // Use GET method to fetch data
      dataType: "json", // Expecting JSON response
    })
      .then(function (tweets) {
        console.log(tweets); // Log the tweets to verify
        renderTweets(tweets); // Function to render tweets
      })
      .catch(function (error) {
        console.log("Error: ", error); // Log any errors
      });
  };

  loadTweets(); // Call the function to load tweets
});
