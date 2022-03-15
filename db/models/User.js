'use strict';
const bcrypt = require('bcryptjs');

module.exports = mongoose => {
  const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      hashedPassword: {
        type: String,
        required: true,
        alias: 'password',
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  userSchema.pre('validate', function (next) {
    if (!this.isModified('hashedPassword')) return next();

    this.hashedPassword = bcrypt.hashSync(this.password);
    next();
  });

  userSchema.statics.signup = async function ({ username, email, password }) {
    const user = await this.create({ username, email, password });

    if (user) return user;
    else return null;
  };

  userSchema.statics.login = async function ({ credential, password }) {
    const user = await this.findOne({
      $or: [
        { username: new RegExp(credential, 'i') },
        { email: new RegExp(credential, 'i') },
      ],
    });

    if (user && user.validatePassword(password)) return user;
    else return null;
  };

  userSchema.methods.toSafeObject = function () {
    const { id, username, email } = this;
    return { id, username, email };
  };

  userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword);
  };

  return mongoose.model('User', userSchema);
};
