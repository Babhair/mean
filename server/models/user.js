var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		minlenght: 3,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	topics: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Topic'
	}],
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}],
	comments: {
		type: Number,
		default: 0
	}

}, {timestamps: true})

UserSchema.pre('save', function(done){
	this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
	done();
})

mongoose.model('User', UserSchema);