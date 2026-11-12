const express = require('express')
const validate = require('../utils/validate')
const validateId = require('../middleware/validateId')
const { requireAuth } = require('../middleware/auth')
const limits = require('../middleware/rateLimiters')
const { uploadCv } = require('../middleware/uploadCv')
const auth = require('../controllers/authController')
const cv = require('../controllers/cvController')
const appt = require('../controllers/appointmentController')
const msg = require('../controllers/messageController')

const router = express.Router()

router.get('/health', (_req, res) => res.json({ success: true, status: 'ok' }))

// Auth (single admin account, created with `npm run seed:admin`)
router.post('/auth/login', limits.login, validate(auth.loginSchema), auth.login)
router.post('/auth/forgot-password', limits.forgot, validate(auth.forgotSchema), auth.forgotPassword)
router.post('/auth/reset-password', limits.reset, validate(auth.resetSchema), auth.resetPassword)
router.get('/auth/me', requireAuth, auth.me)
router.post('/auth/change-password', requireAuth, validate(auth.changePasswordSchema), auth.changePassword)

// CV: info + download are public; upload/delete are admin only.
// requireAuth runs before the upload middleware so anonymous requests never write a file.
router.get('/cv', cv.getInfo)
router.get('/cv/download', cv.download)
router.post('/cv', requireAuth, uploadCv, cv.upload)
router.delete('/cv', requireAuth, cv.remove)

// Appointments: create is public, the rest is admin only.
router.post('/appointments', limits.publicForm, validate(appt.createSchema), appt.create)
router.get('/appointments', requireAuth, validate(appt.listSchema, 'query'), appt.list)
router.patch('/appointments/:id', requireAuth, validateId, validate(appt.statusSchema), appt.updateStatus)
router.delete('/appointments/:id', requireAuth, validateId, appt.remove)

// Contact messages: create is public, the rest is admin only.
router.post('/messages', limits.publicForm, validate(msg.createSchema), msg.create)
router.get('/messages', requireAuth, validate(msg.listSchema, 'query'), msg.list)
router.patch('/messages/:id', requireAuth, validateId, validate(msg.readSchema), msg.setRead)
router.delete('/messages/:id', requireAuth, validateId, msg.remove)

module.exports = router
