/*
* index控制器
* */

const Router = require('koa-router');
const router = new Router();

//模型数据
const indexModel = require('../model/index');

const viewName = '/home/index';

router.get('/', async (ctx, next) => {

	ctx.body = 'index';

});


router.get('/aaa', async (ctx, next) => {
	ctx.redirect(`${viewName}/home`);
});


router.get('/home', async (ctx, next) => {

	const state = await indexModel['index'](ctx);

	await ctx.render(`${viewName}/index`, state);

}).post('/home', async (ctx, next) => {

	const request = ctx.request,
		body = request.body,
		name = body.name,
		age = body.age;

	ctx.body = {
		name,
		age
	};

});

module.exports = router;