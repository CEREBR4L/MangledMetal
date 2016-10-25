var express = require('express'),
        app = express();
var mongoose = require('mongoose');
var twitter = require('twitter');
var env = require('node-env-file');

var tweetTimer;
var quotesDB = require('./quotes/functions.js');
     
/* config */
var connect = mongoose.connect('mongodb://127.0.0.1:27017/MangledMetal');
var port = process.env.PORT || 82;

env(__dirname + '/.env');

var secret = {
	consumer_key: process.env.API_KEY,
	consumer_secret: process.env.API_SECRET,
	access_token_key: process.env.API_ACCESS_TOKEN,
	access_token_secret: process.env.API_SECRET_TOKEN
}

console.log(secret);

var Twitter = new twitter(secret);

function postTweet(){

	quotesDB.tweet(function(data){

		quote = data;

		tweet = quote.quoteText;

		if(tweet.length > 140){
			quotesDB.markTooLong(quote._id);
			clearTimeout(tweetTimer);
			postTweet();
			return;
		}

		Twitter.post('statuses/update', {status: tweet}, function(error, tweetObj, response){
			
			if(error){ console.log("Error tweeting.."); console.log(error); return; };

			console.log(new Date().toString() + ' :: ID: ' + tweetObj.id + ' //  Tweet: ' + tweetObj.text);

			quotesDB.update(quote._id);
			
		});

	});

	tweetTimer = setTimeout(postTweet, 1000 * 60 * 30);

}

postTweet();

app.use('*', function(req, res){
  res.redirect("http://138.68.138.138:8081/");
});

app.listen(port, function(){
    console.log(new Date().toString() + " :: App running on: " + port);
});
