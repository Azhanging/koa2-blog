const Tmpl = require('blue-tmpl');

const fs = require('fs');

const path = require('path');

const ROOT_PATH = process.cwd();

module.exports = (opts) => {
	return function (ctx, next) {

		if (ctx.render) return next();

		ctx.app.context.render = function (_path, data) {
			return new Promise((resolve)=>{
				fs.readFile(path.join(ROOT_PATH, opts.path, _path + '.tmpl'), 'utf8', (err, content) => {
					if (err) {
						this.body = err;
					} else {
						this.body = new Tmpl({
							template: content,
						}).render(data).template;
					}
					resolve();
				});
			});
		};

		return next();
	}
};