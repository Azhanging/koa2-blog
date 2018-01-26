//配置全局的路径
process.path = {
	'root': process.cwd()
};

//默认配置信息
module.exports = {
	//路径相关
	paths:{
		staticPath: "./static",
		viewsPath:'./views'
	},
	//服务器相关
	server: {
		port: 3000
	}
};