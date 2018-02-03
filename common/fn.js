/*常用的方法*/
class Fn {
  isArr(array) {
    return array instanceof Array || !!(array && array.length);
  }

  isObj(obj) {
    return obj instanceof Object && !(obj instanceof Array) && obj !== null;
  }

  isFn(fn) {
    return typeof fn === 'function';
  }

  isStr(string) {
    return typeof string === 'string';
  }

  isNum(num) {
    return typeof num === 'number' || !isNaN(num);
  }

  isEl(el) {
    return !!(el && el.nodeType);
  }

  each(obj, cb) { //遍历
    let i = 0,
      len = obj.length;
    if(this.isArr(obj)) {
      for (; i < len; i++) {
        cb(obj[i], i);
      }
    } else {
      for (i in obj) {
        if(obj.hasOwnProperty(i)) cb(obj[i], i);
      }
    }
  }

  extend(obj, options) { //合并
    this.each(options, (option, key) => {
      obj[key] = option;
    });
    return obj;
  }

  cb(cb, context, args) { //回调
    args = args ? args : [];
    this.isFn(cb) ? (cb.apply(context, args)) : null;
  }

  run(cb, context, args) { //执行函数
    this.cb(cb, context, args);
  }

  unique(arr) { /*去重*/
    if(!this.isArr(arr)) return [];
    let newArray = [];
    this.each(arr, (item, index) => {
      if(newArray.indexOf(item) === -1) {
        newArray.push(item);
      }
    });
    return newArray;
  }

  trimArr(arr) { /*清空数组中空的值*/
    let newArr = [];
    this.each(arr, (item, index) => {
      if(item !== '') {
        newArr.push(item);
      }
    });
    return newArr;
  }

  copy(obj) { /*深拷贝*/
    if(this.isObj(obj) || this.isArr(obj))
      return JSON.parse(JSON.stringify(obj));
    return null;
  }

  serialize(data) { //初始化form数据
    let result = '';

    if(!this.isObj(data) || !this.isArr(data)) return '';

    this.each(data, (val, key) => {

      result = result + key + '=' + encodeURIComponent(val) + '&';

    });

    return result.substring(0, result.length - 1);
  }

  initRegExp(expr) {
    const tm = '\\/*.?+$^[](){}|\'\"';
    this.each(tm, (tmItem, index) => {
      expr = expr.replace(new RegExp('\\' + tmItem, 'g'), '\\' + tmItem);
    });
    return expr;
  }
}

module.exports = new Fn();