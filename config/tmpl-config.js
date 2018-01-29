const Tmpl = require('blue-tmpl');

const path = require('path');

module.exports = function(){
	Tmpl.alias = {
		'__ROOT__':process.path.root,
		'__VIEW__':path.join(__dirname,'../views'),
		'__VIEW_HOME__':path.join(__dirname,'../views/home'),
		'__STATIC__':path.join(__dirname,'../static'),
		'__PUBLIC__':path.join(__dirname,'../static/public')
	};
};