var express = require('express'),
        app = express();
var mongoose = require('mongoose');

var quotesDB = require('./quotes/functions.js');
       
/* config */
var connect = mongoose.connect('mongodb://127.0.0.1:27017/MangledMetal');
var port = process.env.PORT || 8081;

app.get('/quotes', quotesDB.getAll);
app.get('/clearDown', quotesDB.removeAll);

/* public site */
app.use('/css/', express.static(__dirname + '/myFace/css/'));
app.use('/img/', express.static(__dirname + '/myFace/img/'));

app.use('*', function(req, res){
  res.sendFile(__dirname + '/myFace/');
});

app.listen(port, function(){
    console.log("App running on: " + port);
});
