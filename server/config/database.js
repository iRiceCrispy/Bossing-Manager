const { db } = require('./index');

const { mongoUrl } = db;

module.exports = {
  development: {
    database: {
      url: mongoUrl,
      options: {
        useNewUrlParser: true,
        dbName: 'bossing_manager_dev',
      },
    },
  },
  production: {
    database: {
      url: mongoUrl,
      options: {
        useNewUrlParser: true,
        dbName: 'bossing_manager',
      },
    },
  },
};
