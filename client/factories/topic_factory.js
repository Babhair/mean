app.factory('TopicFactory', function($http){
	var factory = {};

	factory.index = function(callback){
		$http.get('/topics').then(callback);
	}

	factory.create = function(newTopic, callback){
		$http.post('/topics', newTopic).then(callback);
	}
	factory.getCategories = function(callback){
		$http.get('/categories').then(callback);
	}
	return factory;
})