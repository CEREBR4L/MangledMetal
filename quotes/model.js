var mongoose = require('mongoose');

var dbSchema = new mongoose.Schema({
	isTweeted: Boolean,
	tooLong: Boolean,
	quoteObj: Object
})

module.exports = mongoose.model('quotes', dbSchema);

