const MongoClient = require('mongodb').MongoClient;

const dbConfig = require('../config/db-config');

function connect(app) {
	MongoClient.connect(dbConfig.url, (err, client) => {

		if (err) {
			console.log(err);
			return;
		}

		console.log('client');

	});
}

module.exports = connect;