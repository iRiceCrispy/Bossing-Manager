const bcrypt = require('bcryptjs');

module.exports = mongoose => {
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
      transform(_doc, ret) {
        delete ret._id;
        delete ret.hashedPassword;
      },
    },
  });

  userSchema.pre('save', function (next) {
    if (!this.isModified('hashedPassword')) return next();

    this.hashedPassword = bcrypt.hashSync(this.password);
    return next();
  });

  userSchema.pre('insertMany', (next, docs) => {
    docs.forEach(doc => {
      doc.hashedPassword = bcrypt.hashSync(doc.password);
      delete doc.password;
    });

    return next();
  });

  userSchema.statics.signup = async function ({ username, email, password }) {
    const user = await this.create({ username, email, password });

    return user;
  };

  userSchema.statics.login = async function ({ credential, password }) {
    const user = await this.findOne({
      $or: [
        { username: new RegExp(credential, 'i') },
        { email: new RegExp(credential, 'i') },
      ],
    }).select('+hashedPassword');

    console.log(user);

    if (user && user.validatePassword(password)) return user;
    return null;
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
