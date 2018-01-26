const dbConnect = require('../mongodb/connect')

const crypto = require('crypto');

const sessionConfig = require('../config/session-config');

class Store {
	constructor() {}
	//生成一个length的hash
	getID(length) {
		return crypto.randomBytes(length).toString('hex');
	}

	get(id) {
		return dbConnect().then((client) => {
			const state = client.db(sessionConfig.db)
				.collection(sessionConfig.collection)
				.find({session: id})
				.toArray();
			client.close();
			return state;
		});
	}

	set(ctx, key) {

	}

	//检查过期
	check(id) {
		//看看是否查到对应的session
		const session = this.get(id)[0];
		if(!session) {
			return false;
		}
	}
}

module.exports = Store;