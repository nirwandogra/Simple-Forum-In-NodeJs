var sess = require('../../session');
var model = require('model');
var connection = model.conn;
module.exports = function(app) {
	app.post('/getcomments', sess.check_login, function(req, res) {
		var user_id = req.session.user;
		var post_id = req.body.post_id;
		var query = 'select comment,id from comment where post_id = ' + post_id + ' and user_id =' + user_id + ';';
		connection.query(query, function(err, rows, fields) {
			res.send(JSON.stringify(rows));
		});
	});
	app.post('/addcomment', sess.check_login, function(req, res) {
		var post_id = req.body.post_id;
		var comment = req.body.comment;
		var user_id = req.session.user;
		var query = 'INSERT INTO comment(post_id,user_id,comment) VALUES(' + post_id + "," + user_id + ",'" + comment + "');";
		console.log(query);
		connection.query(query, function(err, rows, fields) {
			if (err) {
				console.log(err);
			} else {
				console.log("No error " + rows.insertId);
				var id = {
					'id': rows.insertId
				};
				console.log(rows.insertId);
				res.send(id);
			}
		});
	});
}