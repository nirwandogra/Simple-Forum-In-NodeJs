var paths = require('../../path');
var sess = require('../../session');

module.exports = function(app) {
	app.get('/profile', sess.check_login, function(req, res) {
		res.sendFile(paths.home);
	});
}