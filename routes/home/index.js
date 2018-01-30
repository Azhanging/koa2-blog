/*
* 大模块router处理
* */

const Router = require('koa-router');
const router = new Router();

//index controller
const indexRouter = require('./controller/index');
router.use('/index',indexRouter.routes(),indexRouter.allowedMethods());



module.exports = router;