$(document).ready(function () {
  // ensure DOM/HTML loads properly
  // --- our code goes here ---
  const maxChars = 140;
  $("#tweet-text").on("input", function () {
    //grap the element id
    const text = $(this).val(); // fecth the current value of the input in text area
    const currentLength = text.length;
    const remainingVal = maxChars - currentLength;
    $(".counter").text(`${remainingVal}`); // updates DOM elements and display length of tweet

    const isRemainingVal = remainingVal > 0;
    if (!isRemainingVal) {
      $(".counter").text(`${remainingVal}`).css("color", "red");
      console.log("You have exceeded the maximum number of characters!");
    }
  });
});

// ==== SUBMIT FORM ===
/*$(document).ready(() => {
  $(".no-javascript").remove();
        
  $("a").click((event) => event.preventDefault());
      
  $.ajax({
    method: "GET",
    url: "/api/tweets",
    })
    .then(function(tweets) { renderTweets(tweets);
        })
  $("form").on("submit", loadTweets);
  });*/

$(document).ready(() => {
  // Attach event listener to form submit
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted!');
    const formData = $(this).serialize(); // Serialize form data

    $.ajax({
      url: "/api/tweets", // Endpoint to post tweets
      method: "POST", // Use POST method to send data
      data: formData, // Serialized form data
    })
      .then((response) => {
        console.log(response); // Log response for verification
        // Optionally reload tweets to reflect new submission
        // loadTweets(); // Uncomment if you want to reload all tweets
      })
      .catch((error) => {
        console.error("Error: ", error); // Log any errors
      });
  });
});

$(document).ready(function() {
  $('#tweet-form').on('submit', function(event) {
    const tweetContent = $('#tweet-text').val();
    const maxLength = 140;

    if (tweetContent === '') {
      alert('Please fill in the form before submitting!');
      event.preventDefault(); // Prevent form submission
      return;
    }

    if (tweetContent.length > maxLength) {
      alert(`Tweet content cannot exceed ${maxLength} characters.`);
      event.preventDefault(); // Prevent form submission
      return;
    }

    // If validation passes, the form will submit normally
  });
});

//======FORM VALIDATION=====

