const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ApplicationsSchema = new Schema({
  id: Schema.Types.ObjectId,
  idCandidate: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
  idOpenPosition: { type: Schema.Types.ObjectId, ref: 'Open Position', required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = model('Applications', ApplicationsSchema);
