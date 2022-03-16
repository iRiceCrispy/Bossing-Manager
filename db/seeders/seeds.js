module.exports = {
  up: async models => {
    const users = [
      {
        username: 'demouser1',
        email: 'demo@user.io',
        password: 'password',
      },
    ];

    await models.User.insertMany(users);
  },

  down: async models => {
    await models.User.collection.drop();
  },
};
