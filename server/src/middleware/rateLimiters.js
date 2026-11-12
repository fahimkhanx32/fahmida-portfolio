const rateLimit = require('express-rate-limit')

const base = { standardHeaders: 'draft-7', legacyHeaders: false }
const tooMany = (message) => ({ success: false, message })

module.exports = {
  api: rateLimit({ ...base, windowMs: 15 * 60 * 1000, limit: 300, message: tooMany('Too many requests, try again later') }),
  login: rateLimit({ ...base, windowMs: 15 * 60 * 1000, limit: Number(process.env.LOGIN_RATE_LIMIT) || 10, message: tooMany('Too many login attempts, try again in 15 minutes') }),
  reset: rateLimit({ ...base, windowMs: 15 * 60 * 1000, limit: 10, message: tooMany('Too many attempts, try again later') }),
  forgot: rateLimit({ ...base, windowMs: 60 * 60 * 1000, limit: 5, message: tooMany('Too many reset requests, try again later') }),
  publicForm: rateLimit({ ...base, windowMs: 60 * 60 * 1000, limit: 10, message: tooMany('Too many submissions, try again later') }),
}
