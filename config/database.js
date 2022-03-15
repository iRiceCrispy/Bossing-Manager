const { db } = require('./index');
const { mongo_url, mongo_dev_url } = db;

module.exports = {
  development: {
    database: {
      url: mongo_dev_url,
      options: {
        useNewUrlParser: true,
      },
    },
  },
  production: {
    database: {
      url: mongo_url,
      options: {
        useNewUrlParser: true,
        dbName: 'boss_manager',
      },
    },
  },
};
