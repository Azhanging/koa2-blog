const dbConnect = require('../mongodb/connect')

const crypto = require('crypto');

const sessionConfig = require('../config/session-config');

class Store {
  constructor() {
  }

  //生成一个length的hash
  getID(length) {
    return crypto.randomBytes(length).toString('hex');
  }

  get(id) {
    return dbConnect().then((client) => {
      const state = client.db(sessionConfig.db)
        .collection(sessionConfig.collection)
        .find({ session: id })
        .toArray();
      client.close();
      return state;
    });
  }

  set(key, ctx, isSet) {

    const cookies = ctx.cookies,
      { field, time } = sessionConfig;

    //设置新的session
    if (isSet) {
      return dbConnect().then((client) => {
        client.db(sessionConfig.db)
          .collection(sessionConfig.collection)
          .insert({
            [field.session]: cookies.get(sessionConfig.key),
            [field.expires]: new Date().getTime() + time
          });
        client.close();
      });
    }else{
      //对已存在的进行处理
      const session = ctx.session,
        { session: sessionId, status } = session,
        oldId = cookies.get(key);

      //延长时间
      if (status) {
        return dbConnect().then((client) => {
          client.db(sessionConfig.db)
            .collection(sessionConfig.collection)
            .update({ [field.session]: sessionId }, {
              $set: {
                [field.expires]: new Date().getTime() + time
              }
            });
          client.close();
        });
      } else {

        const id = this.getID(24);
        session[field.session] = id;
        cookies.set(key, id);

        //移除原来的session
        return dbConnect().then((client) => {
          client.db(sessionConfig.db)
            .collection(sessionConfig.collection)
            .remove({ [field.session]: oldId }, 1);
          client.close();
        });
      }
    }

  }

  //检查过期
  check(session) {
    return (session['expires'] - new Date().getTime() < 0);
  }
}

module.exports = Store;