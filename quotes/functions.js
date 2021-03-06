var quotes = require('./model.js');

exports.save = function(quote){

	quotes.findOne({quoteLink: quote.quoteLink}, function(err, item){
		
		if(err){ console.log(new Date().toString() + " :: Error finding quote in DB: " + err); return; };

		if(!item){

			var data = new quotes({
				isTweeted: false,
				tooLong: false,
				quoteText: quote.quoteText,
				quoteAuthor: quote.quoteAuthor,
				quoteLink: quote.quoteLink
			});

			data.save(function(err, data){

				if(err){ console.log(new Date().toString() + " :: Error saving quote to DB: " + err); return; };

				console.log(new Date().toString() + " :: Quote Saved to DB: " + data );

			});

		}
		else{
			console.log("Duplicated quote, exiting before creation...");
			return;
		}

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

		if(err){ console.log("Error getting all quotes: " + err); return; }

		res.json(items);
	
	});

}

exports.getTooLong = function(req, res){

	quotes.find({tooLong: true}, function(err, items){

		if(err){ console.log("Error getting long quotes: " + err); return; }

		res.send(items);

	});

}

exports.tweet = function(callback){

	quotes.count({isTweeted: false, tooLong: false}).exec(function(err, count){
		
		if(err){ console.log('Error counting while trying to get a random quote: ' + err); return; };

		var number = Math.floor(Math.random() * count);

		quotes.find({isTweeted: false, tooLong: false}).limit(1).skip(number).exec(function(err, item){

			if(err){ console.log("Error getting random quote: " + err); return; };

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
