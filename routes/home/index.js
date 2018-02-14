/*
* 大模块router处理
* */

const Router = require('koa-router');
const router = new Router();

const login = require('../../common/login');

//index controller
const indexRouter = require('./controller/index');
router.use('/index', indexRouter.routes(), indexRouter.allowedMethods());

//article controller
const articleRouter = require('./controller/article');
router.use('/article', login(), articleRouter.routes(), articleRouter.allowedMethods());

//common controller
const commonRouter = require('./controller/common');
router.use('/common', commonRouter.routes(), commonRouter.allowedMethods());

module.exports = router;