const dbConnect = require('./../../../mongodb/connect');

const sessionConfig = require('./../../../config/session-config');

const dbConnect = require('../mongodb/connect');

const dbConfig = require('../config/db-config');

exports.publish = (ctx) => {
  const { body } = ctx.request;
  const valid = ctx.validform.valid(body, {
    title: [{
      type: '*',
      info: 'title is not null'
    }],
    author: [{
      type: '*',
      info: 'author is not null'
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

  return dbConnect()
    .db(dbConfig.db)
    .collection('article')
    .insert(body);
}