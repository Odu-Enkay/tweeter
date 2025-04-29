/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //======== CREATE TWEETS ELEMENTS ======
  const createTweetElement = (tweet) => {
    const { user, content, created_at } = tweet;

    const $article = $("<article>");
    const $header = $("<header>").addClass("user-tweet");
    const $avatar = $("<img>").attr({
      src: user.avatars,
      alt: "User Avatar",
    });
    const $username = $("<p>").addClass("username").text(user.name);
    const $handle = $("<p>").addClass("avatar").text(user.handle);
    const $contentSpan = $("<span>");
    const $contentText = $("<p>").text(content.text);
    const $footer = $("<footer>");
    const $created = $("<p>").text(
      `${Math.round((Date.now() - created_at) / 86400000)}Days ago`
    );

    // Add Font Awesome icons.
    const $heartIcon = $('<i class="fas fa-heart"></i>').addClass("icon");
    const $flagIcon = $('<i class="fas fa-flag"></i>').addClass("icon");
    const $retweetIcon = $('<i class="fas fa-retweet"></i>').addClass("icon");

    // Assemble the tweet structure to match the HTML
    $header.append($avatar, $username, $handle);
    $contentSpan.append($contentText);
    $footer.append($created, $heartIcon, $flagIcon, $retweetIcon);
    $article.append($header, $contentSpan, $footer);

    return $article;
  };

  //====== RENDER TWEETS ========
  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const tweetElement = createTweetElement(tweet);
      // takes return value and prepends it to the tweets container
      $("#tweet-container").prepend(tweetElement);
    }
  };

  //======== SUBMIT TWEET FORM ============
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // =========== FORM VALIDATION ============
    const $errorMessage = $(".error-message");
    const tweet = $("#tweet-text").val();
    const maxChars = 140;
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
      method: "POST", // POST method to send data
      data: formData, 
    })
      .then((response) => {
        console.log(response); // Log response for verification
        loadTweets(); // Call this after successful submission to reload tweets
        $("#tweet-form").trigger("reset");
        //$tweetText.val(''); 
      })

      // Log any errors
      .catch((error) => {
        console.error("Error: ", error); 
      });
  });

  //===== LOAD TWEET FUNCTION =======
  const loadTweets = function () {
    $.ajax({
      url: "/api/tweets", // Endpoint to get tweets
      method: "GET", 
      dataType: "json", 
    })
      .then(function (tweets) {
        renderTweets(tweets); // Function to render tweets
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };

  //=====SCROLL TOP BTN =======
  $("#to-top").on("click", (event) => {
    event.preventDefault();

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    $("#tweet-text").focus();
  });

  function trackScroll() {
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
      document.getElementById("to-top").style.display = "block";
    } else {
      document.getElementById("to-top").style.display = "none";
    }
  }

  window.onscroll = function () {
    trackScroll();
  };

  // Initial load of tweets when the document is ready
  loadTweets();
});
