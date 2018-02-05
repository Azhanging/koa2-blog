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
  const result = await articleModel['publish'](ctx);
  if(!result.status){
    ctx.body = ctx.$error(result.info);
  }else{
    ctx.body = ctx.$success(result.info,'/home/index');
  }
});

module.exports = router;