const path = require('path');
const Koa = require('koa');

//session库模块
const session = require('./session');
//日志
const logger = require('koa-logger');
//static静态资源的分配
const koaStatic = require('koa-static');

//解析post中的数据
const bodyParser = require('koa-bodyparser');
const tmplViews = require('blue-tmpl-views');

//配置文件
const config = require('./config');
const dbConfig = require('./config/db-config');
const sessionConfig = require('./config/session-config');
const tmplConfig = require('./config/tmpl-config');

//模板的配置
tmplConfig();

//路由
const router = require('./routes');

//mongo库模块
const Mongo = require('./mongodb');

//session
const SessionStroe = require('./session/store');

//创建koa实例
const app = new Koa();

app.context.Mongo = Mongo;

//引入static的中间件
app.use(koaStatic(path.join(__dirname, config.paths.staticPath)));

//引入bodyparser的中间件
app.use(bodyParser());

//session
app.use(session({
	key:sessionConfig.key,
	store:new SessionStroe()
}));

//配置blue-tmpl
app.use(tmplViews({
	path: config.paths.viewsPath
}));

//log
app.use(logger());

//路由模块
app.use(router.routes(), router.allowedMethods());

app.listen(config.server.port, () => {
	console.log(`start server,listen:${config.server.port}`);
});



