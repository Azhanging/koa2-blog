const dbConnect = require('./../../../mongodb/connect');

const sessionConfig = require('./../../../config/session-config');


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

  //验证有误
  if ( !valid.status ) {
    return valid;
  }
}