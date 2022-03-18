const { User, Party } = require('../models');

const seed = async () => {
  const users = await User.insertMany([{
    username: 'demo1',
    email: 'demo1@user.gg',
    password: 'password',
  }, {
    username: 'demo2',
    email: 'demo2@user.gg',
    password: 'password',
  }, {
    username: 'demo3',
    email: 'demo3@user.gg',
    password: 'password',
  }, {
    username: 'demo4',
    email: 'demo4@user.gg',
    password: 'password',
  }, {
    username: 'demo5',
    email: 'demo5@user.gg',
    password: 'password',
  }, {
    username: 'demo6',
    email: 'demo6@user.gg',
    password: 'password',
  }]);

  await Party.insertMany([{
    name: 'Party 1',
    leaderId: users[0].id,
    members: users.map(user => user.id),
  }, {
    name: 'Party 2',
    leaderId: users[1].id,
    members: users.map(user => user.id),
  }, {
    name: 'Party 3',
    leaderId: users[3].id,
    members: users.map(user => user.id),
  }]);
};

const unseed = async () => {
  await Party.collection.drop();
  await User.collection.drop();
};

module.exports = { seed, unseed };
