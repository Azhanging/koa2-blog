/*
* index控制器
* */
const Router = require('koa-router');
const router = new Router();

const indexModel = require('../model/index');
const viewName = '/home/index';

/*home*/
router.get('/', async (ctx, next) => {
  var result = await indexModel['index'](ctx);
  await ctx.render(`${viewName}/index`, result);
});

module.exports = router;