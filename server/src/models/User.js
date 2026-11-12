const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, required: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    username: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    resetTokenHash: { type: String, select: false },
    resetTokenExpires: { type: Date, select: false },
    passwordIsInitial: { type: Boolean, default: false }, // true until the owner sets her own password
    role: { type: String, enum: ['admin'], default: 'admin' },
    passwordChangedAt: { type: Date },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)
