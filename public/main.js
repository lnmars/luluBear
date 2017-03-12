function review(source, rating, dateCreated, name, text, url, id) {
  var source = $("<p></p>").text(source);
  var rating = $("<p></p>").text(rating);
  var date = $("<p></p>").text(dateCreated);
  var name = $("<p></p>").text(name);
  var text = $("<p></p>").text(text);
  var link = $("<a target='_blank'>View Live</a>").attr("href", url);
  var repliedButton = $("<button id='replied-"+id+"' >Mark as Replied</button>").attr("data-id", id);
  var noteForm = $("<form><textarea name='notes' placeholder='Notes'></textarea><input type='submit' value='Save'></form>").attr("data-id", id);
  var notes = $("<ul class='notes' id="+id+"></ul>");

  var reviewContent = $("<div class='unreplied' title="+id+"></div>").append(source, rating, date, name, text, link, repliedButton, noteForm, notes);

  return reviewContent;
};

function appendNotes(id, noteContent) {
  var noteItem = $("<li></li>").text("Note: " + noteContent.notes + " (by: " + noteContent.author + " on: " + noteContent.date + ")");

  $('ul#'+id+'').append(noteItem);
};

$(document).ready(function() {

  $.get('/reviews', function(reviews) {

    for (var i in reviews) {
      $(".list-existing-reviews").prepend(review(reviews[i].review.source, reviews[i].review.rating, reviews[i].review.dateCreated, reviews[i].review.reviewer.name, reviews[i].review.text, reviews[i].review.url, i));
    }
  });

  $(".list-existing-reviews").on("submit", "form", function(event) {
    event.preventDefault();

    var reviewID = event.target.dataset.id;

    console.log(reviewID);

    var noteContent = {
      "notes": event.target.notes.value,
      "author": "Ellen",
      "date": new Date()
    }

    console.log(noteContent);

    $.post('/reviews/review/'+ reviewID +'/notes', noteContent, function(data) {
      // $(".unreplied").append(review(noteContent.notes, noteContent.author, noteContent.date));

      console.log('after', data);
    });

    $('[title='+reviewID+']').append(appendNotes(reviewID, noteContent));

    event.target.notes.value = "";

  });

  $(".list-existing-reviews").on("click", "button", function(event) {
    $("[title="+event.target.dataset.id+"]").addClass("replied");

    //console.log(id);

    console.log(event.target.dataset.id);
 });

});