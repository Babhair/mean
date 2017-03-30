app.controller('UsersController', function(UserFactory, $location){
	console.log('instanciating UsersController...');
	var self = this;
	self.newUser = {};
	self.registrationErrors = [];
	self.current_user = {};
	self.loginUser = {email: "", password: ""};
	self.loginErrors = [];

	UserFactory.session(function(res){
		if(res){
			self.current_user = res.data;
		} else {
			self.current_user = {};
			$location.url('/');
		}
	})

	self.login = function(loginUser){
		UserFactory.login(loginUser, function(res){
			if(res.data.errors){
				self.current_user = {};
				self.loginErrors.push(res.data.errors);
			} else {
				self.current_user = res.data;
				$location.url('/dashboard')
			}
		})
	}

	self.create = function(newUser){
		self.registrationErrors = [];
		UserFactory.create(newUser, function(res){
			console.log(res);
			// if(res.data.code && res.data.code == 11000){
			// 	//generate an error for unique emails and put it in the right place.
			// 	for(key in res.data.errors){
			// 		var error = res.data.errors[key];
			// 		self.registrationError.push(error.message);
			// 	}
			// }
			if(res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key];
					self.registrationError.push(error.message);
				}
			} else {
				self.current_user = res.data;
				$location.url('/dashboard');
			}
		})
	}
})