const ApiError = require('../utils/ApiError')

const notFound = (req, _res, next) => next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`))

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ success: false, message: 'File is too large (max 5 MB)' })
  if (err.name === 'MulterError') return res.status(400).json({ success: false, message: err.message })
  if (err.type === 'entity.parse.failed') return res.status(400).json({ success: false, message: 'Invalid JSON body' })
  if (err.type === 'entity.too.large') return res.status(413).json({ success: false, message: 'Request body too large' })
  if (err.code === 11000) return res.status(409).json({ success: false, message: 'Duplicate value' })

  if (err instanceof ApiError) {
    return res.status(err.status).json({ success: false, message: err.message, ...(err.details && { errors: err.details }) })
  }

  console.error(err)
  res.status(500).json({ success: false, message: 'Internal server error' })
}

module.exports = { notFound, errorHandler }
