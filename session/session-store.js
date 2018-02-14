const dbConnect = require('../mongodb/connect');

const dbConfig = require('../config/db-config');

const crypto = require('crypto');

const sessionConfig = require('../config/session-config');

const { collection: coll, db, field, time, key } = sessionConfig;

class Store {

  /*get length hash*/
  getID(length) {
    return crypto.randomBytes(length).toString('hex');
  }

  /*get session data*/
  get(id) {
    return dbConnect().then((client) => {
      const state = client.db(db)
        .collection(coll)
        .findOne({ session: id });
      client.close();
      return state;
    });
  }

  /*set session ,upexdate session expores,drop timeout session*/

  set(ctx, isSet) {

    const { cookies, request } = ctx,
      { body } = request;

    /*set new session , no login*/
    if ( isSet ) {
      return dbConnect().then((client) => {
        return client.db(dbConfig.db).collection('member').findOne({
          username: body.username
        });
      }).then((user) => {
        //not has user
        if ( !user ) return false;
        //has user
        return dbConnect().then(async (client) => {
          const collection = client.db(db)
            .collection(coll);

          await collection.remove({
            [field.member_id]: user._id
          }, {});

          await collection.remove({
            [field.session]: cookies.get(key)
          }, {});

          await collection.insert({
            [field.session]: cookies.get(key),
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
      if ( sessionId ) {
        return dbConnect().then((client) => {
          client.db(db)
            .collection(coll)
            .update({ [field.session]: sessionId }, {
              $set: {
                [field.expires]: new Date().getTime() + time
              }
            });
          client.close();

          cookies.set(key, sessionId, {
            expires: new Date(new Date().getTime() + time)
          });

          return true;
        });
      } else {

        //drop timeout session
        const id = this.getID(24);

        session[field.session] = id;

        cookies.set(key, id, {
          expires: new Date(new Date().getTime() + time)
        });

        return dbConnect().then((client) => {
          client.db(db)
            .collection(coll)
            .remove({ [field.session]: oldId }, 1);
          client.close();
          return true;
        });
      }
    }
  }

  //check session expires
  check(session) {
    return (session[field.expires] - new Date().getTime() < 0);
  }
}

module.exports = Store;