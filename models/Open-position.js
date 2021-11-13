const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const OpenPositionstSchema = new Schema({
  id: Schema.Types.ObjectId,
  idCompany: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  startDate: {
    type: Date, minlength: 8, maxlength: 8, required: true,
  },
  endDate: { type: Date, minlength: 8, maxlength: 8 },
  jobDescription: {
    type: String, minlength: 10, maxlength: 1000, required: true,
  },
  isActive: { type: Boolean, default: true },
});

module.exports = model('OpenPositions', OpenPositionstSchema);
