var mongoose = require('mongoose');
var Category = mongoose.model('Category');

module.exports = {
	create: function(req, res){
		var category = new Category(req.body);
		category.save(function(err,doc){
			if(err){
				return res.json(err);
			}
			return res.json(doc);
		})
	},
	index: function(req, res){
		Category.find({}).exec(function(err, doc){
			if(err){
				return res.json(err);
			}
			return res.json(doc);
		})
	}
}