module.exports = mongoose => {
  const memberSchema = new mongoose.Schema({
    user: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
    isPaid: {
      type: Boolean,
      default: false,
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
      required: true,
    },
    saleImage: {
      type: String,
      required: true,
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
  });

  return mongoose.model('Drop', dropSchema);
};
