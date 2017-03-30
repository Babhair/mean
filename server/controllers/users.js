var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');

module.exports = {
	index: function(req, res){
		User.find({}).exec(function(err, users){
			if(err){
				return res.json(err);
			}
			return res.json(users);
		})
	},
	login: function(req, res){
		var isValid = true
		User.findOne({email: req.body.email}).exec(function(err, user){
			if(err){
				return res.json(err);
			}
			if(!user){
				return res.json({
					"errors": "invalid credentials"
				})
			}
			if(bcrypt.compareSync(req.body.password, user.password)){
				req.session.user = user;
				return res.json(user);
			}
			return res.json({
				"errors": "invalid credentials"
			})
		})
	},
	create: function(req, res){
		if(req.body.password != req.body.password_confirmation){
			return res.json({
				"errors": {
					"password": {
						"message": "password do not match"
					}
				}
			})
		}
		var user = new User(req.body);
		user.save(function(err, user){
			if(err){
				return res.json(err);
			}
			req.session.user = user;
			return res.json(user);
		})
	},
	session: function(req, res){
		if(!req.session.user){
			return res.json({
				"errors": "not authorized"
			})
		}
		return res.json(req.session.user);
	}
}