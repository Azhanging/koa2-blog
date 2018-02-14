const dbConnect = require('./../../../mongodb/connect');

const sessionConfig = require('./../../../config/session-config');

//index model
exports.index = (ctx) => {
  return dbConnect().then(async (client) => {

    let result = [];

    const coll = await client.db('blog')
      .collection('article');

    if ( ctx.user ) {
      result = await coll.find({ member_id: ctx.user._id })
        .toArray();
    } else {
      result = await coll.find({
        _id: {
          $gt: 0
        }
      }).toArray();
    }

    client.close();

    return {
      articleLists: result
    }
  });
};