const dbConnect = require('./../../../mongodb/connect');

const sessionConfig = require('./../../../config/session-config')

//register model
exports.register = (ctx) => {
	const body = ctx.request.body,
		{ username, password } = body;
	return dbConnect().then((client) => {
		const collection = client.db('blog').collection('member');
		return collection.find({ username }).toArray().then((state) => {
			const status = state[0];
			if(!status) {
				collection.insert({
					username,
					password
				});
			}
			return status;
		});
	});
};

//login model
exports.login = (ctx) => {
	const body = ctx.request.body,
		{ username, password } = body;
	return dbConnect().then((client) => {
		const collection = client.db('blog').collection('member');
		return collection.findOne({ username }).then(async (state) => {
			//password error
			if(!state || (state.password !== password.trim())) {
				return false;
			} else {
				return await ctx.$sessionStore.set(sessionConfig.key, ctx, true);
			}
		});
	});
};