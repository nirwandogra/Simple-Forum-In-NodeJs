var sess = require('../../session');
var model = require('model');
var connection = model.conn;
module.exports = function(app) {
	app.post('/getposts', sess.check_login, function(req, res) {
		var user_id = req.session.user;
		var query = 'select  * from post where user_id = ' + user_id;
		console.log(query);
		connection.query(query, function(err, rows, fields) {
			//rows=rows+{"user_id":1};
			var ret = [];
			ret.push(rows);
			ret.push({
				"user_id": user_id
			});
			res.send(ret);
		});
	});
	app.post('/addpost', sess.check_login, function(req, res) {
		var post_id = req.body.post_id;
		var post_value = req.body.post_value;
		var user_id = req.session.user;
		var query = 'INSERT INTO post(post_value,user_id) VALUES("' + post_value + '"' + "," + user_id + ");";
		console.log(query);
		connection.query(query, function(err, rows, fields) {
			if (err) {
				console.log(err);
				res.send(err);
			} else {
				//res.send(rows);
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