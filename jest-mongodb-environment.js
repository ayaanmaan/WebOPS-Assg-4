const NodeEnvironment = require('jest-environment-node');

class MongoEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    this.global.__MONGO_URI__ = process.env.MONGO_URI;
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
