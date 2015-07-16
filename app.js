var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
var session = require('client-sessions');
var sess = require('./session');
var model = require('model');
var connection = model.conn;
app.use(session({
	cookieName: 'session',
	secret: 'random_string_goes_here',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));
app.use(bodyParser());
//listening on port
//checking pull
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.redirect('/login');
});
require('./routes')(app);
app.listen(port);
//listening on port
console.log('The magic happens on port ' + port);
