/*验证模块*/

const fn = require('./fn');

class Validform {
  constructor() {
    this.dataType = {
      "*": /[\w\W]+/,
      "n": /^\d+$/,
      "p": /^[0-9]{6}$/,
      "m": /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}|17[0-9]{9}$/,
      "e": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      "url": /^(\w+:\/\/)?\w+(\.\w+)+.*$/
    };
  }

  valid(body, valiType) {
    let result = { status: true, info: '' };
    for (let dataKey in  body) {
      if (!body.hasOwnProperty(dataKey)) continue;
      if (!result.status) return result;
      fn.each(valiType, (valids, typeKey) => {
        if (!(dataKey == typeKey)) return;
        fn.each(valids, (valid, index) => {
          let validata = null;
          if (valid.type instanceof RegExp) {
            validata = valid.type;
          } else {
            validata = this.dataType[valid.type];
          }
          if (!(validata.test(body[dataKey]))) {
            result = { status: false, info: valid.info || 'error' }
          }
        });
      });
    }
    return result;
  }
}

/*const valiType = {
  title: [{
    type: '*',
    info: 'input something'
  },{
    type: 'n',
    info: 'input number'
  }],
  aother:[{
    type:'m',
    info:'moblie'
  }]
};

const data = {
  title: '123456',
  aother: 456,
  content: ''
};*/

module.exports = () => {
  return async (ctx, next) => {
    if (ctx.valiform) return next();
    ctx.app.context.validform = new Validform();
    return next();
  }
}

