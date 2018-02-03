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
  const validStatus = await commonModel['register'](ctx);
  if (!validStatus.status) {
    ctx.body = ctx.$error(validStatus.info);
  } else {
    ctx.body = ctx.$success('register success', '/home/index');
  }
});

/*login*/
router.get('/login', async (ctx, next) => {
  await ctx.render(`${viewName}/login`, {});
}).post('/login', async (ctx, next) => {
  const status = await commonModel['login'](ctx);
  if (status) {
    ctx.body = ctx.$success('login success', '/home/index');
  } else {
    ctx.body = ctx.$error('login error');
  }
});

module.exports = router;