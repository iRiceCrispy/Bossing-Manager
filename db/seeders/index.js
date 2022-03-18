const db = require('../models');
const { seedUsers, unseedUsers } = require('./userSeeds');

module.exports.up = async () => {
  db.init();
  await seedUsers();
  db.mongoose.disconnect();
};

module.exports.down = async () => {
  db.init();
  await unseedUsers();
  db.mongoose.disconnect();
};
