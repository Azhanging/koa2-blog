/*
* index控制器
* */

const Router = require('koa-router');
const router = new Router();

//模型数据
const indexModel = require('../model/index');

const viewName = '/home/index';

/*首页*/
router.get('/', async (ctx, next) => {
	await ctx.render(`${viewName}/index`,{
		body:'index'
	});
});

/*注册页*/
router.get('/register', async (ctx, next) => {
	await ctx.render(`${viewName}/register`,{});
}).post('/register',async (ctx, next) => {
	const state = await indexModel['register'](ctx);
	ctx.body = state;
});


module.exports = router;