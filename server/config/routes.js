var Users = require('../controllers/users');
var Topics = require('../controllers/topics');
var Categories = require('../controllers/categories');
var Posts = require('../controllers/posts');

module.exports = function(app){
	app.get('/users', Users.index);
	app.post('/users', Users.create);
	app.get('/session', Users.session);
	app.get('/topics', Topics.index);
	app.post('/topics', Topics.create);
	app.post('/categories', Categories.create);
	app.post('/posts', Posts.create);
	app.post('/comments', Posts.createComment);
	app.put('/posts/:id/like', Posts.like);
	app.put('/posts/:id/dislike', Posts.dislike);
	app.get('/posts', Posts.index);
	app.post('/session', Users.login);
	app.get('/categories', Categories.index);

}