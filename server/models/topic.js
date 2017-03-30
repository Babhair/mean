var mongoose =  require('mongoose');

var TopicSchema = new mongoose.Schema({
	topic: {
		type: String,
		required: true,
		minlength: 10
	},
	author: {
		type: String,
		required: true
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	description: {
		type: String,
		required: false
	},
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}]
}, {timestamps: true})

mongoose.model('Topic', TopicSchema);