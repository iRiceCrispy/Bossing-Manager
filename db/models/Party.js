const autopopulate = require('mongoose-autopopulate');

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
    memberIds: [{
      type: mongoose.ObjectId,
    }],
  }, {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(_data, ret) {
        delete ret._id;
        delete ret.leaderId;
        delete ret.memberIds;
      },
    },
  });

  partySchema.post('save', async (doc, next) => {
    await doc.populate('members');

    return next();
  });

  partySchema.virtual('leader', {
    ref: 'User',
    localField: 'leaderId',
    foreignField: '_id',
    justOne: true,
    autopopulate: true,
  });

  partySchema.virtual('members', {
    ref: 'User',
    localField: 'memberIds',
    foreignField: '_id',
    autopopulate: true,
  });

  partySchema.plugin(autopopulate);

  return mongoose.model('Party', partySchema);
};
