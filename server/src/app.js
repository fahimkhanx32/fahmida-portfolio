const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const env = require('./config/env')
const limits = require('./middleware/rateLimiters')
const routes = require('./routes')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app = express()

app.disable('x-powered-by')
if (env.trustProxy !== '0') app.set('trust proxy', Number.isNaN(Number(env.trustProxy)) ? env.trustProxy : Number(env.trustProxy))

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(
  cors({
    origin: (origin, cb) => cb(null, !origin || env.clientOrigins.includes(origin)),
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
app.use(express.json({ limit: '20kb' }))
app.use('/api', limits.api, routes)
app.use(notFound)
app.use(errorHandler)

module.exports = app
