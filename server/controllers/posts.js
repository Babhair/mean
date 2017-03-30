var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');

module.exports = {
	index: function(req, res){
		Post.find({}).exec(function(err, posts){
			if(err){
				return res.json(err);
			}
			return res.json(posts);
		})
	},
	dislike: function(req, res){
		Post.findById(req.params.id).exec(function(err, post){
			if(err){
				return res.json(err);
			}
			if(!post){
				return res.json({
					"errors": "invalid post"
				})
			}
			post.dislikes++;
			post.save(function(err, post){
				if(err){
					return res.json(err);
				}
				return res.json(post);
			})
		})
	},
	like: function(req, res){
		Post.findById(req.params.id).exec(function(err, post){
			if(err){
				return res.json(err);
			}
			if(!post){
				return res.json({
					"errors": "invalid post"
				})
			}
			post.likes++;
			post.save(function(err, post){
				if(err){
					return res.json(err);
				}
				return res.json(post);
			})
		})
	},
	createComment: function(req, res){
		Post.findById(req.body.post_id).exec(function(err, post){
			if(err){
				return res.json(err);
			}
			if(!post){
					return res.json({
						"errors": "invalid post"
					})
				}
			post.comments.push(req.body);
			post.save(function(err, post){
				if(err){
					return res.json(err);
				}
				User.findById(req.body.user_id).exec(function(err, user){
					if(err){
						return res.json(err);
					}
					if(!user){
						return res.json({
							"errors": "invalid user"
						})
					}
					user.comments++;
					user.save(function(err,user){
						if(err){
							return res.json(err);
						}
						return res.json(post);
					})
				})
			})
		})
	},
	create: function(req, res){
		var post = new Post(req.body);
		post.save(function(err, post){
			if(err){
				return res.json(err);
			}
			Topic.findById(req.body.topic_id).exec(function(err, topic){
				if(err){
					return res.json(err);
				}
				if(!topic){
					return res.json({
						"errors": "invalid topic"
					})
				}
				topic.posts.push(post._id)
				topic.save(function(err, topic){
					if(err){
						return res.json(err);
					}
					User.findById(req.body.user_id).exec(function(err, user){
						if(err){
							return res.json(err);
						}
						if(!user){
							return res.json({
								"errors": "invalid user"
							})
						}
						user.posts.push(post._id);
						user.save(function(err, user){
							if(err){
								return res.json(err);
							}
							return res.json(topic);
						})
					})
				})
			})
		})
	}
}