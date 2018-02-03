/*
* 大模块router处理
* */

const Router = require('koa-router');
const router = new Router();

const login = require('../../common/login');
const user = require('../../common/user');

//index controller
const indexRouter = require('./controller/index');
router.use('/index', login(), user(), indexRouter.routes(), indexRouter.allowedMethods());

//article controller
const articleRouter = require('./controller/article');
router.use('/article',articleRouter.routes(), articleRouter.allowedMethods());

//common controller
const commonRouter = require('./controller/common');
router.use('/common', commonRouter.routes(), commonRouter.allowedMethods());

module.exports = router;