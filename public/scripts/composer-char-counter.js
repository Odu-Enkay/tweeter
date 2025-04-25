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
        
        //loadTweets(); //reloads tweets;
      })
      .catch((error) => {
        console.error("Error: ", error); // Log any errors
      });
  });
});

//========RELOADS TWEETS=======
$('#tweet-form').on('submit', function(event) {
  event.preventDefault();
  
  // Serialize form data
  let formData = $(this).serialize();
  
  // Send POST request
  $.post('/api/tweets', formData)
    .done(function() {
      // Clear tweet container
      $('#tweet-container').empty();
      
      // Fetch and display tweets again
      loadTweets();
    });
});

//======FORM VALIDATION=====

$(document).ready(() => {
  const validateSubmission = function () {
    const tweet = $("#tweet-text").val();
    const maxChars = 140;

    if (tweet === null || tweet === "") {
      alert('Please fill in the form before submitting!');
      return;
    }

    if (tweet.length > maxChars) {
      alert(`Tweet content cannot exceed ${maxChars} characters., try Again!`);
      return;
    }

    return null;
  };

   //======== Form submission handler ========
   $("#tweet-form").on("submit", function (event) {
    const error = validateSubmission();
    if (error) {
      alert(error);
      event.preventDefault();
    }
  });
});





