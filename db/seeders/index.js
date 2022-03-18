const db = require('../models');
const { seed, unseed } = require('./seeds');

module.exports.up = async () => {
  db.init();
  await seed();
  db.mongoose.disconnect();
};

module.exports.down = async () => {
  db.init();
  await unseed();
  db.mongoose.disconnect();
};
