var check = {
	check_login: function(req, res, next) {
		if (req.session == undefined || req.session.user == undefined) {
			res.redirect("/login");
		} else {
			next();
		}
	}
}
module.exports = check;