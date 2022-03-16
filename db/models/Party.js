module.exports = mongoose => {
  const partySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    leaderId: {
      type: mongoose.ObjectId,
      required: true,
    },
    members: [{
      type: mongoose.ObjectId,
      ref: 'User',
    }],
  }, {
    timestamps: true,
    versionKey: false,
  });

  partySchema.virtual('leader', {
    ref: 'User',
    localField: 'leaderId',
    foreignField: '_id',
    justOne: true,
  });

  return mongoose.model('Party', partySchema);
};
