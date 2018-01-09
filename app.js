const path = require('path');

const Koa = require('koa');

//解析post中的数据
const bodyParser = require('koa-bodyparser');

const tmplViews = require('./blue-tmpl-views');

const tmplConfig = require('./config/tmpl-config');

//views
const views = require('koa-views');

//static静态资源的分配
const koaStatic = require('koa-static');

//配置文件
const config = require('./config');

//路由配置
const router = require('./router');

//mongo库模块
const mongo = require('./mongodb');

const session = require('koa-session2');

//创建koa实例
const app = new Koa();

//模板的配置
tmplConfig();

//引入bodyparser的中间件
app.use(bodyParser());

//配置blue-tmpl
app.use(tmplViews({
	path:'./views'
}));

//引入static的中间件
app.use(koaStatic(path.join(__dirname, config.staticPath)));

//路由
app.use(router.routes());

app.listen(config.server.port);

console.log(`start server,listen:${config.server.port}`);

