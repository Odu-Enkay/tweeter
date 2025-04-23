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
});

