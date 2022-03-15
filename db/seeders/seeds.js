'use strict';

module.exports = {
  up: async (models, mongoose) => {
    const users = [
      {
        username: 'demouser1',
        email: 'demo@user.io',
        password: 'password',
      },
    ];

    await models.User.insertMany(users);
  },

  down: async (models, mongoose) => {
    await models.User.collection.drop();
  },
};
