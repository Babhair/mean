var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	post: {
		type: String,
		required: true	
	},
	author: {
		type: String,
		required: true
	},
	comments: [{
		comment: {
			type: String,
		},
		authro: {
			type: String,
		}
	}],
	likes: {
		type: Number,
		default: 0
	},
	dislikes: {
		type: Number,
		default: 0
	},
}, {timestamps: true})

mongoose.model('Post', PostSchema);