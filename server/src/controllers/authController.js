const crypto = require('node:crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z } = require('zod')
const User = require('../models/User')
const ApiError = require('../utils/ApiError')
const mailer = require('../utils/mailer')
const { jwtSecret, jwtExpiresIn, jwtRememberExpiresIn, clientUrl } = require('../config/env')

const BCRYPT_COST = 12
// Compared against when the email is unknown, so response time does not reveal which emails exist.
const DUMMY_HASH = bcrypt.hashSync('timing-equaliser-not-a-real-password', BCRYPT_COST)

const loginSchema = z.object({
  identifier: z.string().trim().toLowerCase().min(1).max(120), // username or email
  password: z.string().min(1).max(200),
  remember: z.boolean().optional(),
})

const forgotSchema = z.object({ identifier: z.string().trim().toLowerCase().min(1).max(120) })

const resetSchema = z.object({
  token: z.string().regex(/^[a-f0-9]{64}$/, 'Invalid token'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(200),
})

const hashToken = (t) => crypto.createHash('sha256').update(t).digest('hex')

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().min(8, 'Password must be at least 8 characters').max(200),
})

const signToken = (user, remember = false) =>
  jwt.sign({ sub: user.id, role: user.role }, jwtSecret, { expiresIn: remember ? jwtRememberExpiresIn : jwtExpiresIn, algorithm: 'HS256' })
const publicUser = (u) => ({ id: u.id, name: u.name, username: u.username, email: u.email, role: u.role, passwordIsInitial: !!u.passwordIsInitial })

async function login(req, res) {
  const { identifier, password, remember } = req.body
  const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] }).select('+passwordHash')
  const ok = await bcrypt.compare(password, user ? user.passwordHash : DUMMY_HASH)
  if (!user || !ok) throw new ApiError(401, 'Invalid username or password')
  res.json({ success: true, message: 'Login successful', data: { token: signToken(user, remember), user: publicUser(user) } })
}

function me(req, res) {
  res.json({ success: true, data: { user: publicUser(req.user) } })
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body
  const user = await User.findById(req.user.id).select('+passwordHash')
  if (!(await bcrypt.compare(currentPassword, user.passwordHash))) throw new ApiError(400, 'Current password is incorrect')
  if (currentPassword === newPassword) throw new ApiError(400, 'New password must be different')

  user.passwordHash = await bcrypt.hash(newPassword, BCRYPT_COST)
  user.passwordChangedAt = new Date()
  user.passwordIsInitial = false
  await user.save()
  // Older tokens are now rejected; hand back a fresh one.
  res.json({ success: true, message: 'Password changed', data: { token: signToken(user) } })
}

const GENERIC_FORGOT = 'If an account matches, a password reset link has been sent to its email address.'

/** Public: starts a password reset. Always answers the same way so it cannot be used to find accounts. */
async function forgotPassword(req, res) {
  const { identifier } = req.body
  const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] })
  if (user) {
    const token = crypto.randomBytes(32).toString('hex')
    user.resetTokenHash = hashToken(token)
    user.resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000)
    await user.save()
    try {
      await mailer.sendResetEmail(user.email, `${clientUrl}/reset-password?token=${token}`)
    } catch (err) {
      console.error('Failed to send reset email:', err.message)
    }
  }
  res.json({ success: true, message: GENERIC_FORGOT })
}

/** Public: completes a password reset with the emailed token (single use, 30 min). */
async function resetPassword(req, res) {
  const { token, password } = req.body
  const user = await User.findOne({ resetTokenHash: hashToken(token), resetTokenExpires: { $gt: new Date() } }).select(
    '+resetTokenHash +resetTokenExpires',
  )
  if (!user) throw new ApiError(400, 'This reset link is invalid or has expired')
  user.passwordHash = await bcrypt.hash(password, BCRYPT_COST)
  user.passwordChangedAt = new Date()
  user.passwordIsInitial = false
  user.resetTokenHash = undefined
  user.resetTokenExpires = undefined
  await user.save()
  res.json({ success: true, message: 'Password updated. You can now log in.' })
}

module.exports = {
  login, me, changePassword, forgotPassword, resetPassword,
  loginSchema, changePasswordSchema, forgotSchema, resetSchema, BCRYPT_COST,
}
