var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');

module.exports = {
	index: function(req, res){
		Topic.find({}).populate('category').exec(function(err, topics){
			if(err){
				return res.json(err);
			}
			return res.json(topics);
		})
	},
	create: function(req, res){
		var topic = new Topic(req.body);
		topic.save(function(err, topic){
			if(err){
				return res.json(err);
			}
			User.findById(req.body.user_id).exec(function(err, user){
				if(err){
					return res.json(err);
				}
				user.topics.push(topic._id);
				user.save(function(err, user){
					if(err){
						return res.json(err);
					}
					return res.json(topic);
				})
			})
		})
	}
}