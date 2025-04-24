


$(document).ready(function() {  // ensure DOM/HTML loads properly
  // --- our code goes here ---
  const maxChars = 140;
    $('#tweet-text').on('input', function () {   //grap the element id
      const text = $(this).val(); // fecth the current value of the input in text area
      const currentLength = text.length;
      const remainingVal = maxChars - currentLength;
      $('.counter').text(`${remainingVal}`) // updates DOM elements and display length of tweet

      const isRemainingVal = remainingVal > 0;
      if(!isRemainingVal){
        $('.counter').text(`${remainingVal}`).css('color', 'red');
        console.log('You have exceeded the maximum number of characters!')
      }
    });

    // ==== SUBMIT FORM ===
  $(".form").on("submit", function(event) {
    console.log('Button clicked, performing ajax call...');
    event.preventDefault();

    const formData = $(event.target).serialize();
  
    console.log(event);
    $.ajax({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      data: formData,
    })
      .then((data) => {
        const postElement = createPostElement(data);
        $("main").prepend(postElement);
        $("form").trigger("reset")
        // $("input").val("")
        // $("textarea").val("")
        // $("select").val("")
      });
  })
});