const mongoose = require('mongoose')

// Singleton: only one current CV exists (key is always "current").
const cvSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'current', unique: true },
    storedName: { type: String, required: true },
    originalName: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Cv', cvSchema)
