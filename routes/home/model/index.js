const dbConnect = require('./../../../mongodb/connect');

const sessionConfig = require('./../../../config/session-config');

//index model
exports.index = (ctx) => {
  return dbConnect().then(async (client) => {
    const result = await client.db('blog')
      .collection('article')
      .find({ member_id: ctx.user._id })
      .toArray();
    return {
      articleLists: result
    }
  });
};