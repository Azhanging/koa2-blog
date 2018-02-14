const dbConnect = require('./connect');

const primaryKey = {
  id: 'primary_key',
  idField: '_id',
  value: 'sequence_value',
  sequence_value: 0,
  db: 'blog'
};

module.exports = (opts) => {
  return dbConnect().then(async (client) => {
    const collection = client
      .db(opts.db || primaryKey.db)
      .collection(opts.collection);

    //has primary key data?
    const primaryLen = await collection.find({
      [primaryKey.idField]: primaryKey.id
    }).count();

    //not primary key,insert table key data
    if (primaryLen === 0) {
      await collection.insert({
        [primaryKey.idField]: primaryKey.id,
        [primaryKey.value]: primaryKey.sequence_value
      });
    }

    //check and set primary key
    const primary = await collection.findAndModify({
      [primaryKey.idField]: primaryKey.id
    }, [], {
      $inc: {
        [primaryKey.value]: 1
      }
    }, {
      new: true
    });

    client.close();

    return primary.value[primaryKey.value];
  });
};

/*{
  db: 'primary',
  collection: 'test'
}*/
