/*
* session 模块
* */

const sessionConfig = require('../config/session-config');

module.exports = (opts = {}) => {
  //获取配置信息
  const { key, store, field } = opts;

  if ( key ) {
    sessionConfig.key = key;
  }

  return async (ctx, next) => {
    if ( !ctx.app.context.$sessionStore ) {
      ctx.app.context.$sessionStore = store;
    }
    //init session
    if ( !ctx.session ) {
      ctx.session = {};
    }
    const cookies = ctx.cookies,
      id = cookies.get(key);
    //if has session id , check session expires
    if ( id ) {
      //查看id是否过期了
      const session = await store.get(id);

      if ( session ) {
        //检查过期状态
        const checkStatus = store.check(session);
        //存在数据库,过期了
        if ( checkStatus ) {
          ctx.session = {};
        } else {
          //存在数据库，没过期，延迟时间
          ctx.session = session;
        }
        await store.set(ctx);
      } else {
        ctx.session = {};
      }
    } else {
      //当前的用户cookie不存在session id，生成新的id
      cookies.set(key, store.getID(24), {
        expires: new Date(new Date().getTime() + sessionConfig.time)
      });
    }
    return next();
  }
};