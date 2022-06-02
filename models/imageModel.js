var pg = require('pg');
var sprintf = require("sprintf-js").sprintf
var config = require('./../config');

var conString = sprintf("postgres://%s:%s@%s/%s", config.postgresql.user, config.postgresql.pass,
	config.postgresql.host, config.postgresql.db);

/**
 * Error handler for postgres connection
 *
 * @param err
 * @returns {boolean}
 */
var handleError = function (err) {
	// no error occurred, continue with the request
	if (!err) return false;

	// An error occurred, remove the client from the connection pool.
	// A truthy value passed to done will remove the connection from the pool
	// instead of simply returning it to be reused.
	// In this case, if we have successfully received a client (truthy)
	// then it will be removed from the pool.
	done(client);
	res.writeHead(500, {'content-type': 'text/plain'});
	res.end('An error occurred');
	return true;
};

var getImage = function(req, res) {
	pg.connect(conString, function(err, client, done) {
		client.query('SELECT * FROM imagesRouter', function (err, result) {
			// handle an error from the query
			if (handleError(err)) return;
			done();
			res.json(result);
		});
	});
};

var insertImageToDb = function() {

};

var helpFun = function() {
};

var helpFun1 = function() {
}

module.exports = {
	getImage : getImage
}
