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
        status: !(state),
        info: state ? 'has username' : 'register success'
      };
    });
  });
};

//login model
exports.login = (ctx) => {
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
    return collection.findOne({ username }).then(async (state) => {
      //password error
      if (!state || (state.password !== password.trim())) {
        return {
          status: false,
          info: 'password is error'
        };
      } else {
        await ctx.$sessionStore.set(ctx, true);
        return {
          status: true,
          info: 'login success'
        }
      }
    });
  });
};