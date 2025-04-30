/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //======== CREATE TWEETS ELEMENTS ======
  const createTweetElement = (tweet) => {
    const { user, content } = tweet;

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
    const $created = $("<p>").text(timeago.format(tweet.created_at));

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
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $("#tweet-container").prepend(tweetElement);
    }
  };

  // =========== FORM VALIDATION ============
  function validateTweet(tweetText) {
    const $errorMessage = $(".error-message");
    const trimmedTweet = tweetText.trim();
    const maxChars = 140;
    let error = null;
    $errorMessage.slideUp();

    if (!trimmedTweet || trimmedTweet.length === 0) {
      error = "Please fill in the form before submitting";
    }

    if (trimmedTweet.length > maxChars) {
      error = `Tweet content cannot exceed ${maxChars} characters. Try again!`;
    }

    if (error) {
      $errorMessage.text(error).slideDown();
      return false;
    }

    return true;
  }

  //======== SUBMIT TWEET FORM ============
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const tweetText = $("#tweet-text").val();
    if (!validateTweet(tweetText)) {
      return;
    }

    // Serialize form data after validation passes
    const formData = $(this).serialize();

    $.ajax({
      url: "/api/tweets",
      method: "POST",
      data: formData,
    })
      .then((response) => {
        $("#tweet-form").trigger("reset");
        const tweetElement = createTweetElement(response);
        $("#tweet-container").prepend(tweetElement);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  });

  //===== LOAD TWEET FUNCTION =======
  const loadTweets = function () {
    $.ajax({
      url: "/api/tweets",
      method: "GET",
      dataType: "json",
    })
      .then(function (tweets) {
        renderTweets(tweets);
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };

  //=====SCROLL TOP BTN =======
  $("#to-top").on("click", (event) => {
    event.preventDefault();

    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800
    );

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
