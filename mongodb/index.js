const MongoClient = require('mongodb').MongoClient;

class Mongo {
	constructor() {
		this.client = null;
	}
	//链接db
	connect(opts) {
		return new Promise((resolve) => {
			MongoClient.connect(opts.url, (err, client) => {
				if(err) {
					throw(err);
				}
				//设置client对象
				this.client = client;
				resolve.call(this, client);
			});
		}).catch((e)=>{
			console.log(e);
		});
	}
}

module.exports = Mongo;