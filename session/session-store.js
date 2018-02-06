const dbConnect = require('../mongodb/connect');

const dbConfig = require('../config/db-config');

const crypto = require('crypto');

const sessionConfig = require('../config/session-config');

class Store {

  /*get length hash*/
  getID(length) {
    return crypto.randomBytes(length).toString('hex');
  }

  /*get session data*/
  get(id) {
    return dbConnect().then((client) => {
      const state = client.db(sessionConfig.db)
        .collection(sessionConfig.collection)
        .findOne({ session: id });
      client.close();
      return state;
    });
  }

  /*set session ,update session expores,drop timeout session*/

  set(key, ctx, isSet) {

    const { cookies } = ctx,
      { body } = ctx.request,
      { field, time } = sessionConfig;

    /*set new session , no login*/
    if (isSet) {
      return dbConnect().then((client) => {
        return client.db(dbConfig.db).collection('member').findOne({
          username: body.username
        });
      }).then((user) => {
        //not has user
        if (!user) return false;
        //has user
        return dbConnect().then((client) => {
          const collection = client.db(sessionConfig.db)
            .collection(sessionConfig.collection);

          collection.remove({
            [field.member_id]: user._id
          });

          collection.insert({
            [field.session]: cookies.get(sessionConfig.key),
            [field.expires]: new Date().getTime() + time,
            [field.member_id]: user._id
          });

          client.close();
          return true;
        });
      });
    } else {
      /*db has session*/
      const session = ctx.session,
        { session: sessionId } = session,
        oldId = cookies.get(key);

      //add timeout
      if (sessionId) {
        return dbConnect().then((client) => {
          client.db(sessionConfig.db)
            .collection(sessionConfig.collection)
            .update({ [field.session]: sessionId }, {
              $set: {
                [field.expires]: new Date().getTime() + time
              }
            });
          client.close();
          return true;
        });
      } else {
        //drop timeout session
        const id = this.getID(24);
        session[field.session] = id;
        cookies.set(key, id);
        return dbConnect().then((client) => {
          client.db(sessionConfig.db)
            .collection(sessionConfig.collection)
            .remove({ [field.session]: oldId }, 1);
          client.close();
          return true;
        });
      }
    }
  }

  //check session expires
  check(session) {
    return (session[sessionConfig.field.expires] - new Date().getTime() < 0);
  }
}

module.exports = Store;