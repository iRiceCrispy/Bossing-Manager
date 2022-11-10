const databaseName = process.env.DB_NAME || 'production';
const databaseNameDev = process.env.DB_NAME_DEV || 'development';

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  database: {
    uri: process.env.MONGO_URI,
    options: {
      production: {
        dbName: databaseName,
      },
      development: {
        dbName: databaseNameDev,
      },
    },
  },
};
