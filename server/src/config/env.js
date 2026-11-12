require('dotenv').config()

const missing = ['MONGODB_URL', 'JWT_SECRET'].filter((k) => !process.env[k])
if (missing.length) {
  throw new Error(`Missing required environment variable(s): ${missing.join(', ')}. See .env.example`)
}
if (process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long')
}

const clientOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  jwtRememberExpiresIn: process.env.JWT_REMEMBER_EXPIRES_IN || '7d',
  clientOrigins,
  clientUrl: clientOrigins[0].replace(/\/$/, ''), // used in password-reset links
  trustProxy: process.env.TRUST_PROXY || '0',
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.MAIL_FROM || process.env.SMTP_USER || '',
  },
}
