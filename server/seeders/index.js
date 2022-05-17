const { seed, unseed } = require('./seeds');

module.exports.up = async () => {
  await seed();
};

module.exports.down = async () => {
  await unseed();
};
