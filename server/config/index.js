module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  mongoUrl: {
    production: process.env.MONGO_URI,
    development: process.env.MONGO_URI_DEV,
  },
};
