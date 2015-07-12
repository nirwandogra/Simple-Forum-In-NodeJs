var sess = require('../../session');
var model = require('model');
var connection = model.conn;
module.exports = function(app) {
	app.post('/getreplies', sess.check_login, function(req, res) {
		var user_id = req.session.user;
		var post_id = req.body.post_id;
		var comment_id = req.body.comment_id;
		var query = 'select reply,id from replies where post_id = ' + post_id + ' AND ' + ' comment_id=' + comment_id + ' and user_id =' + user_id + ';';
		console.log(query);
		connection.query(query, function(err, rows, fields) {
			if (err) {
				res.send(err);
			} else {
				res.send(JSON.stringify(rows));
			}
		});
	});
	app.post('/addreply', sess.check_login, function(req, res) {
		var post_id = req.body.post_id;
		var comment_id = req.body.comment_id;
		var reply = req.body.reply;
		var user_id = req.session.user;
		var query = 'INSERT INTO replies(comment_id,post_id,user_id,reply) VALUES(' + comment_id + ',' + post_id + "," + user_id + ",'" + reply + "');";
		console.log(query);
		connection.query(query, function(err, rows, fields) {
			if (err) {
				console.log(err);
			} else {
				console.log("No error ");
				var id = {
					'id': rows.insertId
				};
				console.log(rows.insertId);
				res.send(id);
			}
		});
	});
}