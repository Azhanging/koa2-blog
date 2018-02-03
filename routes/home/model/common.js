const dbConnect = require('./../../../mongodb/connect');

const sessionConfig = require('./../../../config/session-config')

//register model
exports.register = (ctx) => {
  const body = ctx.request.body,
    { username, password } = body;

  const valid = ctx.validform.valid(body, {
    username: [{
      type: '*',
      info: 'username is not null'
    }],
    password: [{
      type: '*',
      info: 'password is not null'
    }, {
      type: /\d{4,8}/,
      info: 'password length in 4 - 8'
    }]
  });

  //验证有误
  if (!valid.status) {
    return valid;
  }

  return dbConnect().then((client) => {
    const collection = client.db('blog').collection('member');
    return collection.findOne({ username }).then((state) => {
      if (!state) {
        collection.insert({
          username,
          password
        });
      }
      return {
        status: state,
        info: state ? 'register success' : 'has username'
      };
    });
  });
};

//login model
exports.login = (ctx) => {
  const body = ctx.request.body,
    { username, password } = body;
  return dbConnect().then((client) => {
    const collection = client.db('blog').collection('member');
    return collection.findOne({ username }).then(async (state) => {
      //password error
      if (!state || (state.password !== password.trim())) {
        return false;
      } else {
        return await ctx.$sessionStore.set(sessionConfig.key, ctx, true);
      }
    });
  });
};