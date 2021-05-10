const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ReclamationSchema = new Schema({
  leaveId: {
    type: String,
    required: true,
    unique: true,
  },
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  applyDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
  },
  document: {
    // path to uploaded document
    type: String,
    default: '',
  },
  isDocumentProvided: { type: Boolean, default: false },
  alterations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'alterations',
    },
  ],
});

Object.assign(ReclamationSchema.statics);

module.exports = Leave = mongoose.model('reclamation', ReclamationSchema);
