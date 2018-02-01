/*
* index控制器
* */
const Router = require('koa-router');
const router = new Router();

const indexModel = require('../model/index');
const viewName = '/home/index';

/*home*/
router.get('/', async (ctx, next) => {
	await ctx.render(`${viewName}/index`, {
		body: 'index',
		isLogin: JSON.stringify(ctx.session) != "{}"
	});
});

module.exports = router;