const dbConnect = require('./../../../mongodb/connect');

//index model
exports.index = (ctx) => {
	return dbConnect().then((client) => {
		const state = client.db('blog')
			.collection('session')
			.find({})
			.toArray();
		client.close();
		return state;
	});
};