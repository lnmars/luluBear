function review(source, rating, dateCreated, text, url) {
  var source = $("<p></p>").text(source);
  var rating = $("<p></p>").text(rating);
  var date = $("<p></p>").text(dateCreated);
  var content = $("<p></p>").text(text);
  var link = $("<a target='_blank'>View on" + source + "</a>").attr("href", url);

  var reviewContent = $("<div class='review'>").append(source, rating, date, content, link);

  console.log(source, rating, date);

  return reviewContent;
};

$(document).ready(function() {

  $.get('/reviews', function(reviews) {
 //   var loop = reviews[i].review;

    for (var i in reviews) {
      $(".list-existing-reviews").append(review(reviews[i].review.source, reviews[i].review.rating, reviews[i].review.dateCreated, reviews[i].review.text, reviews[i].review.url));
      console.log(reviews[i].review.source);
    }
  });

});