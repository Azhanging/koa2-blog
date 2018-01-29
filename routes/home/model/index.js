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

//register model
exports.register = (ctx) => {
	const body = ctx.request.body,
		{username, password} = body;

	let info = {
		status: 1,
		info: 'register success',
		url: '/home/index'
	};

	return dbConnect().then((client) => {
		const collection = client.db('blog').collection('member');
		return collection.find({username}).toArray().then((state) => {
			if(state[0]) {
				info = {
					status: 0,
					info: 'has username',
					url: ''
				};
			} else {
				collection.insert({
					username,
					password
				});
			}
			return info;
		});
	});
};