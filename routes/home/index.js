/*
* 大模块router处理
* */

const Router = require('koa-router');
const router = new Router();

//注册index控制器
const indexRouter = require('./controller/index');
router.use('/index',indexRouter.routes(),indexRouter.allowedMethods());

//抛出接口
module.exports = router;