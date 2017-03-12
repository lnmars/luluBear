var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

var reviews = require('./reviews.json')

app.get('/reviews', function(req, res) {
  res.json(reviews);
});

app.post('/reviews/review/:id/notes', function(req, res) {
  
  console.log(reviews[req.params.id].review.notes);

  reviews[req.params.id].review.notes.push(req.body);
 
  res.json(reviews[req.params.id].review.notes);
});

app.get('/*', function(req, res) {
  res.status(404).send('Error 404: Page not found');
});

app.listen(port);

console.log('app.js started on port' + port);