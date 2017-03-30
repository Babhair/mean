var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	category: {
		type: String,
		required: true
	}
}, {timestamps: true})

mongoose.model('Category', CategorySchema);