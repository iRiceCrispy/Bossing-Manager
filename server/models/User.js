const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
    select: false,
    alias: 'password',
  },
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      return {
        id: ret.id,
        username: ret.username,
      };
    },
  },
});

userSchema.statics.signup = async function signup({ username, email, password }) {
  const hashedPassword = bcrypt.hashSync(password);

  const user = await this.create({ username, email, hashedPassword });

  return user;
};

userSchema.statics.login = async function login({ credential, password }) {
  const user = await this.findOne({
    $or: [
      { username: new RegExp(`^${credential}$`, 'i') },
      { email: new RegExp(`^${credential}$`, 'i') },
    ],
  }).select('+hashedPassword');

  if (user && user.validatePassword(password)) {
    return user;
  }

  return null;
};

userSchema.methods.toPrivate = function toPrivate() {
  return {
    id: this.id,
    username: this.username,
    email: this.email,
  };
};

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

module.exports = mongoose.model('User', userSchema);
