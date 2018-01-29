const dbConnect = require('./../../../mongodb/connect');

const sessionConfig = require('./../../../config/session-config')

//index model
exports.index = (ctx) => {
  return dbConnect().then((client) => {
    const state = client.db('blog')
      .collection('session')
      .find({})
      .toArray();
    client.close();
    return state;
  });
};

//register model
exports.register = (ctx) => {
  const body = ctx.request.body,
    { username, password } = body;

  let info = {
    status: 1,
    info: 'register success',
    url: '/home/index'
  };

  return dbConnect().then((client) => {
    const collection = client.db('blog').collection('member');
    return collection.find({ username }).toArray().then((state) => {
      const status = state[0];
      if (!status) {
        collection.insert({
          username,
          password
        });
      }
      return status;
    });
  });
};

//login model
exports.login = (ctx) => {
  const body = ctx.request.body,
    { username, password } = body;
  return dbConnect().then((client) => {
    const collection = client.db('blog').collection('member');
    return collection.find({ username }).toArray().then(async (state) => {
      //密码不正确
      if (!state[0].password == password.trim()) {
        return false;
      } else {
        ctx.session = {
          status: true,
          session: ctx.cookies.get(sessionConfig.key)
        };
        await ctx.$sessionStore.set(sessionConfig.key, ctx, true);
        return true;
      }
    });
  });
};