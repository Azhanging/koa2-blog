/*
* article控制器
* */
const Router = require('koa-router');
const router = new Router();

const articleModel = require('../model/article');
const viewName = '/home/article';

/*index*/
router.get('/', async (ctx, next) => {
  await ctx.render(`${viewName}/index`);
});

/*publish*/
router.get('/publish', async (ctx, next) => {
  await ctx.render(`${viewName}/publish`, {
    body: 'index'
  });
}).post('/publish', async (ctx, next) => {
  const { body } = ctx.request;
});

module.exports = router;