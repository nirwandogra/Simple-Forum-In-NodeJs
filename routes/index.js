module.exports = function(app) {
	require('./search')(app);
	require('./profile')(app);
	require('./user')(app);
	require('./login')(app);
}