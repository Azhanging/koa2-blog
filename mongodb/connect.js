//connent database
const Mongo = require('./index');

const dbConfig = require('../config/db-config');

module.exports = () => {
	return new Mongo().connect({url:dbConfig.url});
};