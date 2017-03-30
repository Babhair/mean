var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/client'));
app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  rolling: true
}))
app.use(bodyParser.json());

require('./server/config/mongoose');
require('./server/config/routes')(app);

app.listen(8000, function(){
	console.log('listening on port 8000...');
})