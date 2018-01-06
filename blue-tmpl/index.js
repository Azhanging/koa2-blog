
const Tmpl = require('blue-tmpl');

const fs = require('fs');

const path = require('path');


module.exports = function(app,opts){
	app.context.render = async function(_path,data){
		const time = new Date().getTime();
		try{
			const html = fs.readFileSync(path.join(__dirname,'../',opts.path,_path+'.tmpl'),{
				encoding:'utf8'
			});

			this.body = new Tmpl({
				template:html,
			}).render(data).template;

		}catch(e){
			this.body = e;
		}
	};
};