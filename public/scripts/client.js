/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
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
      `Date created: ${Math.round(
        (Date.now() - created_at) / 86400000
      )}Days ago`
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

  //======== SUBMIT TWEET FORM ============
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // =========== FORM VALIDATION ============
    const $errorMessage = $(".error-message");
    const tweet = $("#tweet-text").val();
    const maxChars = 10;
    let error = null;
    $errorMessage.slideUp();

    if (!tweet || tweet.length === 0) {
      error = "Please fill in the form before submitting";
    }

    if (tweet.length > maxChars) {
      error = `Tweet content cannot exceed ${maxChars} characters. Try again!`;
    }

    if (error) {
      $errorMessage.text(error).slideDown();
      return;
    }

    // Serialize form data after validation passes
    const formData = $(this).serialize();

    // Send POST request
    $.ajax({
      url: "/api/tweets", // Endpoint to post tweets
      method: "POST", // Use POST method to send data
      data: formData, // Serialized form data
    })
      .then((response) => {
        console.log(response, "response!"); // Log response for verification
        loadTweets(); // Call this after successful submission to reload tweets
        $("#tweet-form").trigger("reset");
        //$tweetText.val(''); // Clear the textarea after submission
      })
      .catch((error) => {
        console.error("Error: ", error); // Log any errors
      });
  });

  //===== LOAD TWEET FUNCTION =======
  const loadTweets = function () {
    $.ajax({
      url: "/api/tweets", // Endpoint to get tweets
      method: "GET", // Use GET method to fetch data
      dataType: "json", // Expecting JSON response
    })
      .then(function (tweets) {
        console.log(tweets, "unsuccess"); // Log the tweets to verify
        renderTweets(tweets); // Function to render tweets
      })
      .catch(function (error) {
        console.log("Error: ", error); // Log any errors
      });
  };

  // Initial load of tweets when the document is ready
  loadTweets();
});
