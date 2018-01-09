const Router = require('koa-router');

	const router = new Router();

	router.get('/', (ctx, next) => {
		ctx.body = `<p>index</p>`;
	});

	router.get('/home', async (ctx, next) => {

		ctx.cookies.set('laosiji','gaoshiqing');

		await ctx.render('/index/index',{
			list:[
				{
					title:'title1',
					content:'content1'
				},{
					title:'title2',
					content:'content2'
				},{
					title:'title3',
					content:'content3'
				},{
					title:'title4',
					content:'content4'
				},{
					title:'title5',
					content:'content5'
				}
			],
			a:'1',
			b:4
		});

}).post('/home', async (ctx, next) => {

	const request = ctx.request,
		body = request.body,
		name = body.name,
		age = body.age;

	ctx.cookies.set('name', name, {expires: new Date()});

	ctx.body = `
		${name} , ${age}
	`;

});

module.exports = router;