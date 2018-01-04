const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx, next) => {
	ctx.body = `<p>index</p>`;
});

router.get('/home', async (ctx, next) => {
	ctx.body = `
		<script src="/js/tmpl.min.js"></script>
		<img src="/images/head.jpg" alt="" width="100" height="100">
		<form method="post" action="/index/home">
			<input type="text" name="name">
			<input type="text" name="age">
			<button>submit</button>
		</form>
	`;
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