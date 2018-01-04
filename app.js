const path = require('path');

const Koa = require('koa');

//配置文件
const config = require('./config');

//路由配置
const router = require('./router');

//解析post中的数据
const bodyParser = require('koa-bodyparser');

//static静态资源的分配
const static = require('koa-static');

const app = new Koa();

//引入bodyparser的中间件
app.use(bodyParser());

//引入static的中间件
app.use(static(path.join(__dirname,config.staticPath)));

//路由
app.use(router.routes());

app.listen(3000);

