function review(source, rating, dateCreated, name, text, url, id) {
  var source = $("<h3></h3>").text(source);
  var rating = $("<h3></h3>").text("Rating: " + rating + "/5");
  var date = $("<h3></h3>").text(dateCreated);
  var name = $("<h3></h3>").text(name);
  var repliedButton = $("<button id='replied-"+id+"' >Mark as Replied</button>").attr("data-id", id);
  var text = $("<p></p>").text(text);
  var link = $("<a target='_blank'>View Live</a>").attr("href", url);
  var noteForm = $("<form><textarea name='notes' placeholder='Notes'></textarea><input type='submit' value='Save Notes'></form>").attr("data-id", id);
  var notes = $("<ul class='notes' id="+id+"></ul>");

  var reviewContent = $("<div class='unreplied' title="+id+"></div>").append(source, rating, date, name, link, repliedButton, text, noteForm, notes);

  return reviewContent;
};

function appendNotes(id, noteContent) {
  var noteItem = $("<li></li>").text("Note: " + noteContent.notes + " (by: " + noteContent.author + " on: " + noteContent.date + ")");

  $('ul#'+id+'').append(noteItem);
};

function avg(reviews) {
  var sum = 0;

  for (var i in reviews) {
    sum = sum + parseInt(reviews[i].review.rating);
  };

  var average = $("<p></p>").text((sum/reviews.length).toFixed(1));
  return average;
};

/*var numUnreplied = function (reviews) {
  var p = $("<p></p>").text($(".unreplied").length);
  $(".unreplied-reviews").append(p);
}*/

$(document).ready(function() {

  $.get('/reviews', function(reviews) {

    for (var i in reviews) {
      $(".list-existing-reviews").prepend(review(reviews[i].review.source, reviews[i].review.rating, reviews[i].review.dateCreated, reviews[i].review.reviewer.name, reviews[i].review.text, reviews[i].review.url, i));
    };

    $(".average").append(avg(reviews));

    $(".unreplied-reviews").append($("<p></p>").text($(".unreplied").length));
  });

  $(".list-existing-reviews").on("submit", "form", function(event) {
    event.preventDefault();

    var reviewID = event.target.dataset.id;

    var noteContent = {
      "notes": event.target.notes.value,
      "author": "Ellen",
      "date": new Date()
    }

    console.log(noteContent);

    $.post('/reviews/review/'+ reviewID +'/notes', noteContent, function(data) {

      console.log('after', data);
    });

    $('[title='+reviewID+']').append(appendNotes(reviewID, noteContent));

    event.target.notes.value = "";

  });

  $(".list-existing-reviews").on("click", "button", function(event) {

    console.log("# of Unreplied: " + $(".unreplied").length);

    $("[title="+event.target.dataset.id+"]").removeClass("unreplied").addClass("replied");

    $(".unreplied-reviews p").text($(".unreplied").length);

    console.log("# of Unreplied: " + $(".unreplied").length);

    console.log("Review ID: " + event.target.dataset.id);
 });

});