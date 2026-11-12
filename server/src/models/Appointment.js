const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true },
    petName: { type: String, trim: true },
    petType: { type: String, trim: true },
    service: { type: String, trim: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, trim: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending', index: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Appointment', appointmentSchema)
