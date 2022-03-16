module.exports = mongoose => {
  const partySchema = new mongoose.Schema({
    leaderId: {
      type: mongoose.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    members: [{
      type: mongoose.ObjectId,
      ref: 'User',
    }],
    hashedPassword: {
      type: String,
    },
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
