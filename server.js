var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request'); 
var cheerio = require('cheerio');
var PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/3000');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var Note = require('./models/Note.js');
var Article = require('./models/Article.js');

app.get('/', function(req, res) {
  res.send(index.html);
});

app.get('/scrape', function(req, res) {
request("https://www.reddit.com/r/hearthstone", function(error, response, html) {

  var $ = cheerio.load(html);

  var results = [];

  $("p.title").each(function(i, element) {
    var title = $(element).text();
    var link = $(element).children().attr("href");

    results.push({
      title: title,
      link: link
    });
  });
  console.log(results);
});

  res.send('<a href="index.html">Scrape Complete</a>');
});

app.get('/articles', function(req, res){

  Article.find({}, function(err, doc){
    if (err){
      console.log(err);
    } 
    else {
      console.log("Good to go!");
      res.json(doc);
    }
  });
});

app.get('/articles/:id', function(req, res){
  Article.findOne({'_id': req.params.id})
  .populate('note')
  .exec(function(err, doc){
    if (err){
      console.log(err);
    } 
    else {
      res.json(doc);
    }
  });
});

app.post('/articles/:id', function(req, res){

  var newNote = new Note(req.body);

  newNote.save(function(err, doc){

    if(err){
      console.log(err);
    } 
    else {
      Article.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
      .exec(function(err, doc){
        if (err){
          console.log(err);
        } else {
          res.send(doc);
        }
      });
    }
  });
});


app.listen(PORT, function() {
  console.log('App running on port 3000!');
});