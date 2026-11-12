const { z } = require('zod')
const Message = require('../models/Message')
const ApiError = require('../utils/ApiError')

const createSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email().max(120),
  subject: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10).max(2000),
  website: z.string().optional(), // honeypot
})

const listSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  isRead: z.enum(['true', 'false']).optional(),
})

const readSchema = z.object({ isRead: z.boolean().default(true) })

/** Public: contact form submission. */
async function create(req, res) {
  const { website, ...data } = req.body
  if (website) return res.status(201).json({ success: true, message: 'Message sent' })
  await Message.create(data)
  res.status(201).json({ success: true, message: 'Message sent' })
}

async function list(req, res) {
  const { page, limit, isRead } = req.validated.query
  const filter = isRead ? { isRead: isRead === 'true' } : {}
  const [items, total] = await Promise.all([
    Message.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Message.countDocuments(filter),
  ])
  res.json({ success: true, data: { items, total, page, pages: Math.ceil(total / limit) } })
}

async function setRead(req, res) {
  const msg = await Message.findByIdAndUpdate(req.params.id, { isRead: req.body.isRead }, { new: true })
  if (!msg) throw new ApiError(404, 'Message not found')
  res.json({ success: true, data: msg })
}

async function remove(req, res) {
  const msg = await Message.findByIdAndDelete(req.params.id)
  if (!msg) throw new ApiError(404, 'Message not found')
  res.json({ success: true, message: 'Message deleted' })
}

module.exports = { create, list, setRead, remove, createSchema, listSchema, readSchema }
