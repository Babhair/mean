app.controller('TopicsController', function(TopicFactory, UserFactory){
	console.log('instanciating TopicsController...');
	var self = this;
	self.topics = [];
	self.categories = [];

	self.create = function(newTopic){
		newTopic.author = UserFactory.current_user.name;
		TopicFactory.create(newTopic, function(res){
			self.index()
		})
	}

	self.index = function(){
		TopicFactory.index(function(res){
			self.topics = res.data;
			console.log(self.topics);
		})
	}
	self.getCategories = function(){
		TopicFactory.getCategories(function(res){
			self.categories = res.data;
		})
	}
	
})