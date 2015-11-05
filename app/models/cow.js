var mongoose = require('mongoose');

module.exports = mongoose.model('Cow', {
	name: 	   { type: String, default: '' },
	gender:    { type: String, default: '' },
	birthdate: { type: String, default: '' }
});