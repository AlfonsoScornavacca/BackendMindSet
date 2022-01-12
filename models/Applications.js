const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ApplicationsSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    idCandidate: {
      type: Schema.Types.ObjectId,
      ref: 'Candidates',
      required: true,
    },
    idOpenPosition: {
      type: Schema.Types.ObjectId,
      ref: 'OpenPositions',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Discarded', 'Assigned'],
      default: 'Pending',
    },
    // isActive: { type: Boolean, default: true },
  },
  // { timestamps: true },
);

module.exports = model('Applications', ApplicationsSchema);
