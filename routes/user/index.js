module.exports = function(app) {
	require('./comment')(app);
	require('./post')(app);
	require('./reply')(app);
}