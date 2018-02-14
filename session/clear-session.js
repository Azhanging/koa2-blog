/*
* 定清理无用的session
* */

const dbConnect = require('../mongodb/connect');
const sessionConfig = require('../config/session-config');

module.exports = () => {
	setTimeout(function () {
		dbConnect().then((client) => {
			client.db(sessionConfig.db)
				.collection(sessionConfig.collection)
				.remove({
					expires: {
						$lt: new Date().getTime()
					}
				});

      client.close();

		});
		setTimeout(arguments.callee, sessionConfig.clearTime);
	}, sessionConfig.clearTime);
}