const Router = require('koa-router');

const router = new Router();

const index = require('./router/index.js');

//挂载index
router.use('/index',index.routes());

module.exports = router;