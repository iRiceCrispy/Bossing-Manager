const autopopulate = require('mongoose-autopopulate');

module.exports = mongoose => {
  const memberSchema = new mongoose.Schema({
    userId: {
      type: mongoose.ObjectId,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  }, {
    _id: false,
    toJSON: {
      virtuals: true,
      transform(_data, ret) {
        delete ret.userId;
      },
    },
  });

  const dropSchema = new mongoose.Schema({
    partyId: {
      type: mongoose.ObjectId,
      required: true,
    },
    bossName: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    saleImage: {
      type: String,
    },
    price: {
      type: Number,
    },
    sold: {
      type: Boolean,
      default: false,
    },
    members: [memberSchema],
  }, {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(_data, ret) {
        delete ret._id;
        delete ret.partyId;
      },
    },
  });

  dropSchema.virtual('party', {
    ref: 'Party',
    localField: 'partyId',
    foreignField: '_id',
    justOne: true,
    autopopulate: true,
  });

  dropSchema.virtual('members.user', {
    ref: 'User',
    localField: 'members.userId',
    foreignField: '_id',
    justOne: true,
    autopopulate: true,
  });

  dropSchema.plugin(autopopulate);

  return mongoose.model('Drop', dropSchema);
};
