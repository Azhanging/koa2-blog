const dbConnect = require('../../../mongodb/connect');

const sessionConfig = require('../../../config/session-config');

const dbConfig = require('../../../config/db-config');

const primaryKey = require('../../../mongodb/primary-key.js');

exports.publish = (ctx) => {
  const { body } = ctx.request;
  const valid = ctx.validform.valid(body, {
    title: [{
      type: '*',
      info: 'title is not null'
    }],
    content: [{
      type: "*",
      info: "content is not null"
    }]
  });

  //valid error
  if ( !valid.status ) {
    return valid;
  }

  return dbConnect().then(async (client) => {
    const primaryId = await primaryKey({
      collection: 'article'
    });

    const result = await client.db(dbConfig.db)
      .collection('article')
      .insert(Object.assign(body, {
        _id: primaryId,
        author: ctx.user.username,
        create_time: new Date().getTime(),
        is_del: 0,
        ['member_id']: ctx.user._id
      }))
      .then(() => {
        valid.info = 'publish success';
        return valid;
      });

    client.close();

    return result;
  })
}