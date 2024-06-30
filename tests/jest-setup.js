const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async function() {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  global.__MONGOD__ = mongod;
};
