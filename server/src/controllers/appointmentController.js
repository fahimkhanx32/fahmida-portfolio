const { z } = require('zod')
const Appointment = require('../models/Appointment')
const ApiError = require('../utils/ApiError')

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled']
const opt = (max) => z.string().trim().max(max).optional()

const createSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^\+?[\d\s\-()]{7,20}$/, 'Enter a valid phone number'),
  email: z.string().trim().toLowerCase().email().max(120).optional().or(z.literal('').transform(() => undefined)),
  petName: opt(60),
  petType: opt(40),
  service: opt(80),
  // Tolerates timezones: a date from "yesterday" UTC is still today in Dhaka.
  preferredDate: z.coerce.date().refine((d) => d.getTime() >= Date.now() - 24 * 60 * 60 * 1000, 'Date cannot be in the past'),
  preferredTime: opt(20),
  message: opt(1000),
  website: z.string().optional(), // honeypot: real visitors never fill this
})

const listSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(STATUSES).optional(),
})

const statusSchema = z.object({ status: z.enum(STATUSES) })

/** Public: book an appointment request. */
async function create(req, res) {
  const { website, ...data } = req.body
  if (website) return res.status(201).json({ success: true, message: 'Appointment request received' }) // bot: pretend success, store nothing
  const appt = await Appointment.create(data)
  res.status(201).json({ success: true, message: 'Appointment request received', data: { id: appt.id, status: appt.status } })
}

/** Admin: paginated list, optional ?status= filter, newest first. */
async function list(req, res) {
  const { page, limit, status } = req.validated.query
  const filter = status ? { status } : {}
  const [items, total] = await Promise.all([
    Appointment.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Appointment.countDocuments(filter),
  ])
  res.json({ success: true, data: { items, total, page, pages: Math.ceil(total / limit) } })
}

async function updateStatus(req, res) {
  const appt = await Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
  if (!appt) throw new ApiError(404, 'Appointment not found')
  res.json({ success: true, data: appt })
}

async function remove(req, res) {
  const appt = await Appointment.findByIdAndDelete(req.params.id)
  if (!appt) throw new ApiError(404, 'Appointment not found')
  res.json({ success: true, message: 'Appointment deleted' })
}

module.exports = { create, list, updateStatus, remove, createSchema, listSchema, statusSchema }
