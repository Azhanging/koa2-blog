/*
* get member data
* */

const dbConnect = require('../mongodb/connect');
const sessionConfig = require('../config/session-config');

module.exports = () => {
  return async (ctx, next) => {
    if (!(JSON.stringify(ctx.session) == "{}")) {
      ctx.user = await dbConnect().then((client) => {
        return client
          .db(sessionConfig.db)
          .collection('member')
          .findOne({_id:ctx.session[sessionConfig.field.member_id]});
      });
    }
    return next();
  }
}