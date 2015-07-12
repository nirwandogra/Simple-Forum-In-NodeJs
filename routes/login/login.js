var paths = require('../../path');
var sess = require('../../session');
var model = require('model');
var connection = model.conn;
module.exports = function(app) {
	app.get('/login', function(req, res) {
		res.sendFile(paths.login);
	});
	app.post('/login', function(req, res) {
		///sess = req.session;
		var email = req.body.email;
		var pass = req.body.pass;
		console.log("trying to redirect");
		var query = 'select id,password from user where username= "' + email + '";';
		console.log(query);
		connection.query(query, function(err, rows, fields) {
			if (!err && rows[0] != undefined && rows[0].password == pass) {
				req.session.user = rows[0].id;
				req.session.email = email;
				res.redirect("/profile");
			} else {
				console.log('error is there ');
				res.redirect("/login");
			}
		});
	});
	app.post('/logout', function(req, res) {
		req.session.reset();
		console.log("detroyed session");
		res.redirect('/login');
	});
}