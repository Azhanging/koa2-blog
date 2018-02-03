/*
* info state
* */

module.exports = () => {
	return async (ctx, next) => {

		if(ctx.app.context.$success) return next();

		ctx.app.context.$success = (info = "", url = "") => {
			return {
				info,
				url,
				status: 1
			}
		};

		ctx.app.context.$error = (info = "", url = "") => {
			return {
				info,
				url,
				status: 0
			}
		};

		return next();
	}
};