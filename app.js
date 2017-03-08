var express = require('express');
var bodyParser = require('body-parser)');

var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

var reviews = [
  {
     "review": {
    "id": 1,
    "reviewer": {
      "id": 123,
      "name": "Jessie"
    },
    "source": "Yelp",
    "rating": 4,
    "text": "AWESOME PLACE!  They didn't even kick my children.",
    "time-created": "2017-02-28 13-46-24",
    "url": "http://fugeziLink.com/reviews/id:1"
    }
  }
];

app.get('/reviews', function(req, res) {
  res.json(reviews);
});

app.get('/*', function(req, res) {
  res.status(404).send('Error 404: Page not found');
});

app.listen(port);

console.log('app.js started on port' + port);