/*
* session 模块
* */

module.exports = (opts = {}) => {

	//获取配置信息
	const {key, store} = opts;

	return async (ctx, next) => {

		const cookies = ctx.cookies,
			id = cookies.get(key);

		//如果存在session的id，查看session是否过期了
		if(id) {
			//查看id是否过期了
			const status = store.check(id);

		} else {
			//当前的用户不存在session id，生成新的id
			cookies.set(key, store.getID(24));
		}
		return next();
	}
};