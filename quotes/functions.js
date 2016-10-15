var quotes = require('./model.js');

exports.save = function(quote){

	var data = new quotes({
		isTweeted: false,
		tooLong: false,
		quoteObj: quote
	});

	data.save(function(err, data){

		if(err){ console.log(new Date().toString() + " :: Error saving quote to DB: " + err); return; };

		console.log(new Date().toString() + " :: Quote Saved to DB: " + data );

	});

}

exports.update = function(quote){

	quotes.findOne({_id: quote}, function(err, item){

		item.isTweeted = true;

		item.save(function(err){

			if(err){ console.log(new Date().toString() + " :: Error updaing quote in DB: " + err); return; };

			console.log(new Date().toString() + " :: Tweet updated to be marked tweeted");

		});

	});

}

exports.getAll = function(req, res){

	quotes.find({}).sort({_id: -1}).exec(function(err, items){
		res.json(items);
	});

}

exports.tweet = function(callback){

	quotes.count({isTweeted: false, tooLong: false}).exec(function(err, count){
		
		if(err){ console.log('Error counting while trying to get a random quote: ' + err); return; }

		var number = Math.floor(Math.random() * count);

		quotes.findOne({isTweeted: false, tooLong: false}, function(err, item){

			console.log(new Date().toString() + " :: Got data: " + item);
			callback(item);

		});
	});
}

exports.markTooLong = function(id){

	quotes.findOne({_id: id}, function(err, item){

		item.tooLong = true;

		item.save(function(err){

			if(err){ console.log(new Date().toString() + " :: Error updaing quote to be too long in DB: " + err); return; };

			console.log(new Date().toString() + " :: Tweet updated to be marked too long");

		});

	});
}
