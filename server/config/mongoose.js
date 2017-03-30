var mongoose = require('mongoose')
var fs = require('fs');
console.log('connecting to db...');

mongoose.connect('mongodb://localhost/belt_review');

var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') != -1){
		console.log('loading ' + file + '...');
		require(models_path + '/' + file);
	}
})