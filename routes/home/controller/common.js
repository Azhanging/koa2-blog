/*
* index控制器
* */
const Router = require('koa-router');
const router = new Router();

const commonModel = require('../model/common');
const viewName = '/home/common';

/*register*/
router.get('/register', async (ctx, next) => {
  await ctx.render(`${viewName}/register`, {});
}).post('/register', async (ctx, next) => {
  const result = await commonModel['register'](ctx);
  if (!result.status) {
    ctx.body = ctx.$error(result.info);
  } else {
    ctx.body = ctx.$success(result.info, '/home/index');
  }
});

/*login*/
router.get('/login', async (ctx, next) => {
  await ctx.render(`${viewName}/login`, {});
}).post('/login', async (ctx, next) => {
  const result = await commonModel['login'](ctx);
  if (!result.status) {
    ctx.body = ctx.$error(result.info);
  } else {
    ctx.body = ctx.$success(result.info, '/home/index');
  }
});

module.exports = router;