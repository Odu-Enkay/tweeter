/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //======== CREATE TWEETS ELEMENTS
/*const createTweetElement = (tweet) => {
  const { user, content, created_at } = tweet;

  const $article = $("<article>");
  const $avatar = $(`<img src=${user.avatars}>`);
  const $username = $('<p class="old-tweet">');
  const $handle = $('<p class="old-tweet">');
  const $content = $("<p class='tweet-content'>");
  const $created = $("<p>");

  $username.text(`${user.name}`);
  $handle.text(`${user.handle}`);
  $content.text(content.text);
  $created.text(
    `Date created: ${Math.round(
      (Date.now() - created_at) / 86400000
    )}Days ago`
  );
  const $awesomeFonts = $("<p>").text("awwesome fonts"); // Added element for "awwesome fonts"

  // Append the tweet content to match the HTML

  const $header = $("<header>").append($avatar, $username, $handle);
  const $span = $("span").append($content);
  const $footer = $("<footer>").append($created, $awesomeFonts);

  article.$header.append($avatar, $username, $handle);
  $article.span.append($content);
  $article.$footer.append($created, $awesomeFonts);

  /*const $header = $(".tweet-header").append($avatar, $username, $handle);
  const $span = $(".tweet-content").append($content);
  const $footer = $(".tweet-footer").append($created, $awesomeFonts);
  $article.append($header, $span, $footer);*/

  //return $article;
  
//};

//======== CREATE TWEETS ELEMENTS
const createTweetElement = (tweet) => {
  const { user, content, created_at } = tweet;

  const $article = $("<article>");
  const $header = $("<header>").addClass("user-tweet");
  const $avatar = $("<img>").attr({
    src: user.avatars,
    alt: "User Avatar",
  });
  const $username = $("<p>").addClass("Username").text(user.name);
  const $handle = $("<p>").addClass("avatar").text(user.handle); // Corrected class name
  const $contentSpan = $("<span>");
  const $contentText = $("<p>").text(content.text);
  const $footer = $("<footer>");
  const $created = $("<p>").text(
    `${Math.round(
      (Date.now() - created_at) / 86400000
    )}Days ago`
  );

  // Add Font Awesome icons.
  const $heartIcon = $('<i class="fas fa-heart"></i>').addClass('icon');
  const $flagIcon = $('<i class="fas fa-flag"></i>').addClass('icon'); 
  const $retweetIcon = $('<i class="fas fa-retweet"></i>').addClass('icon');

  // Assemble the tweet structure to match the HTML
  $header.append($avatar, $username, $handle); // Image, Username, Handle
  $contentSpan.append($contentText); // Tweet Content
  $footer.append($created, $heartIcon, $flagIcon, $retweetIcon); 
  $article.append($header, $contentSpan, $footer);

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

  $("#to-top").on("click", (event) => {
    event.preventDefault();

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    $("#tweet-text").focus();
  })

  function trackScroll() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      $("#to-top").style.display = "block";
    } else {
      $("#to-top").style.display = "none";
    }
  }

  window.onscroll = function() {trackScroll()};

  // Initial load of tweets when the document is ready
  loadTweets();
});
