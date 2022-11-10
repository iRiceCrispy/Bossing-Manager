const mongoose = require('mongoose');
const { environment, database: { uri, options } } = require('./index');

mongoose.connect(uri, options[environment])
  .catch((err) => {
    console.error(`MongoDB initial connection error: \n${err}`);
  });

mongoose.connection.on('connected', () => {
  console.log('MongoDB has successfully connected!');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: \n${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB connection lost.');
});

module.exports = mongoose;
