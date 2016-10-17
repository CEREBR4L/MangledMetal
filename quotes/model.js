var mongoose = require('mongoose');

var dbSchema = new mongoose.Schema({
	isTweeted: Boolean,
	tooLong: Boolean,
	quoteText: String,
	quoteAuthor: String,
	quoteLink: String
})

module.exports = mongoose.model('quotes', dbSchema);

