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
    members: [{
      type: mongoose.ObjectId,
      ref: 'User',
      autopopulate: true,
    }],
  }, {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(_data, ret) {
        delete ret._id;
      },
    },
  });

  partySchema.virtual('leader', {
    ref: 'User',
    localField: 'leaderId',
    foreignField: '_id',
    justOne: true,
    autopopulate: true,
  });

  partySchema.plugin(autopopulate);

  return mongoose.model('Party', partySchema);
};
