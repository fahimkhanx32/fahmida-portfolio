const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ApiError = require('../utils/ApiError')
const { jwtSecret } = require('../config/env')

/** Requires "Authorization: Bearer <jwt>" from an existing admin. Sets req.user. */
async function requireAuth(req, _res, next) {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')
  if (scheme !== 'Bearer' || !token) throw new ApiError(401, 'Authentication required')

  let payload
  try {
    payload = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] })
  } catch {
    throw new ApiError(401, 'Invalid or expired token')
  }

  const user = await User.findById(payload.sub)
  if (!user || user.role !== 'admin') throw new ApiError(401, 'Invalid or expired token')

  // Tokens issued before the last password change are no longer valid.
  if (user.passwordChangedAt && payload.iat < Math.floor(user.passwordChangedAt.getTime() / 1000)) {
    throw new ApiError(401, 'Invalid or expired token')
  }

  req.user = user
  next()
}

module.exports = { requireAuth }
