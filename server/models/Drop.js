const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

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
      return {
        user: ret.user,
        isPaid: ret.isPaid,
      };
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
      return {
        id: ret.id,
        bossName: ret.bossName,
        itemName: ret.itemName,
        image: ret.image,
        sold: ret.sold,
        price: ret.price,
        saleImage: ret.saleImage,
        party: ret.party,
        members: ret.members,
      };
    },
  },
});

dropSchema.post('save', async (doc, next) => {
  await doc.populate('members.user');

  return next();
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

module.exports = mongoose.model('Drop', dropSchema);
