
$(document).ready(function () {
  const maxChars = 140;
  const counterElement = $(".counter");

  $("#tweet-text").on("input", function () {
    const text = $(this).val();
    const currentLength = text.length;
    const remainingVal = maxChars - currentLength;

    counterElement.text(`${remainingVal}`);

    if (remainingVal < 0) {
      counterElement.css("color", "red");
      console.log("You have exceeded the maximum number of characters!");
    } else {
      counterElement.css("color", "#292d31");
    }
  });
});
