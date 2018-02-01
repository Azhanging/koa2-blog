/*
* 定清理无用的session
* */

const dbConnect = require('../mongodb/connect');

const sessionConfig = require('../config/session-config');

module.exports = () => {
	const time = 1000*60*60*2;
	setTimeout(function () {
		dbConnect().then((client) => {
			client.db(sessionConfig.db)
				.collection(sessionConfig.collection)
				.remove({
					expires: {
						$lt: new Date().getTime()
					}
				});
		});
		setTimeout(arguments.callee, time);
	}, time);
}