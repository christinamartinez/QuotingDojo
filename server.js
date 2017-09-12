var express = require('express');
// require the express module
var app = express();
// create an express app

var bodyParser = require('body-parser');
// This is in charge of posting things!
app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');
// app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// mongoose.Promise = global.Promise;



var mongoose = require('mongoose');
// 2. require mongoose variable
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/quotes_app');
// 3. connect mongoose  to mongo DB
// 4. create mongoose schemas
var QuoteSchema = new mongoose.Schema({
    author: String,
    // JSON object as its parameter
    text: String
}, {timestamps: true});
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

// You can think of these as our model ^^^^^^^^^^^ 



app.get('/', function(request, response) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    response.render('index');
})

app.post('/quotes', function(req, res){
  Quote.create(req.body, function(err){
    if(err) { console.log(err); }
    res.redirect('/quotes');
  });
});
// Add User Request 
app.get('/quotes', function(req, res){
  // Logic to grab all quotes and pass into the rendered view
  Quote.find({}, function(err, results){
    if(err) { console.log(err); }
    res.render('quotes', { quotes: results });
  });
});




app.listen(8000, function() {
    console.log("listening on port 8000");
})



