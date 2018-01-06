const path = require('path');

const Koa = require('koa');

//解析post中的数据
const bodyParser = require('koa-bodyparser');

//jade模板
const pug = require('pug');

const ejs = require('ejs');

const tmplViews = require('./blue-tmpl');

//views
const views = require('koa-views');

//static静态资源的分配
const static = require('koa-static');

//配置文件
const config = require('./config');

//路由配置
const router = require('./router');

//mongo库模块
const mongo = require('./mongodb');

const session = require('koa-session2');

//创建koa实例
const app = new Koa();

// mongo(app);

//引入bodyparser的中间件
app.use(bodyParser());

//配置blue-tmpl
tmplViews(app,{
	path:'./views'
});

//
// app.use(session({
// 	key: 'laosiji'
// }));

//引入static的中间件
app.use(static(path.join(__dirname, config.staticPath)));

//路由
app.use(router.routes());

app.listen(config.server.port);

console.log(`start server,listen:${config.server.port}`);

