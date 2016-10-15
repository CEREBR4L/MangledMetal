var express = require('express'),
        app = express();
var mongoose = require('mongoose');

var quotesDB = require('./quotes/functions.js');
       
/* config */
var connect = mongoose.connect('mongodb://127.0.0.1:27017/MangledMetal');
var port = process.env.PORT || 8081;

app.get('/quotes', quotesDB.getAll);

app.listen(port, function(){
    console.log("App running on: " + port);
});
