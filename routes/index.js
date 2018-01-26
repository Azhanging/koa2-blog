const Router = require('koa-router');

const router = new Router();

//index cotroller
const homeController = require('./home/index');

//index路由
router.use('/home',homeController.routes(),homeController.allowedMethods());

module.exports = router;