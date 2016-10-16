var express = require('express'),
        app = express();
var mongoose = require('mongoose');
var forismatic = require('forismatic-node')();

var quotesDB = require('./quotes/functions.js');
       
/* config */
var connect = mongoose.connect('mongodb://127.0.0.1:27017/MangledMetal');
var port = process.env.PORT || 8083;

function getQuote(){

	forismatic.getQuote({lang: 'en', generateKey: true}, function(err, quote){
		
		if(err){ console.log(new Date().toString() + " :: Erroe getting quote: " + err); return; };

		console.log(new Date().toString() + " :: " + quote);

		quotesDB.save(quote);

	});

	setTimeout(getQuote, 1000 * 60 * 3);

}

getQuote();

app.use('*', function(req, res){
  res.redirect("http://138.68.138.138:8081/");
});

app.listen(port, function(){
    console.log(new Date().toString() + " :: App running on: " + port);
});
