/*
* check login status
* */

module.exports = () => {
	return async (ctx, next) => {
		if(JSON.stringify(ctx.session) == "{}") {
			ctx.redirect('/home/common/login');
		}else{
			return next();
		}
	}
};