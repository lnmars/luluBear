function review(source, rating, dateCreated, name, text, url, id) {
  var source = $("<p></p>").text(source);
  var rating = $("<p></p>").text(rating);
  var date = $("<p></p>").text(dateCreated);
  var name = $("<p></p>").text(name);
  var text = $("<p></p>").text(text);
  var link = $("<a target='_blank'>View Live</a>").attr("href", url);
  var noteForm = $("<form><textarea name='notes' placeholder='Notes'></textarea><input type='submit' value='Save'></form>").attr("data-id", id);

  var reviewContent = $("<div class='unreplied'>").append(source, rating, date, name, text, link, noteForm);

  return reviewContent;
};

$(document).ready(function() {

  $.get('/reviews', function(reviews) {

    for (var i in reviews) {
      $(".list-existing-reviews").prepend(review(reviews[i].review.source, reviews[i].review.rating, reviews[i].review.dateCreated, reviews[i].review.reviewer.name, reviews[i].review.text, reviews[i].review.url, i));
    }
  });

  $(".list-existing-reviews").on("submit", "form", function(event) {
    event.preventDefault();
    console.log(event.target.dataset.id);

    var noteContent = {
      "notes": event.target.notes.value,
      "author": "Ellen",
      "date": new Date()
    }

    console.log(noteContent);

    $.post('/reviews/review/:id/notes', noteContent, function(data) {
      $(".unreplied").append(review(noteContent.notes, noteContent.author, noteContent.date));

      console.log(data);
    });

    event.target.notes.value = "";

  });

});