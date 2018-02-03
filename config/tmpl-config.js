const BlueTmpl = require('blue-tmpl');

const path = require('path');

module.exports = function(){
	BlueTmpl.alias = {
		'__ROOT__':process.path.root,
		'__VIEW__':path.join(__dirname,'../views'),
		'__VIEW_HOME__':path.join(__dirname,'../views/home'),
		'__STATIC__':path.join(__dirname,'../static'),
		'__PUBLIC__':path.join(__dirname,'../static/public')
	};

	//登录状态扩展
	BlueTmpl.prototype.isLogin = (ctx) => {
		return 	JSON.stringify(ctx.session) != '{}';
	}
};