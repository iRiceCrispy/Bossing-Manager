const { User } = require('../models');

const users = [{
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
}];

const seedUsers = async () => {
  await User.insertMany(users);
};

const unseedUsers = async () => {
  await User.collection.drop();
};

module.exports = { seedUsers, unseedUsers };
