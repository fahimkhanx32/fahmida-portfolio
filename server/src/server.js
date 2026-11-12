const env = require('./config/env')
const connectDb = require('./config/db')
const app = require('./app')

connectDb()
  .then(() => app.listen(env.port, () => console.log(`API running on http://localhost:${env.port}`)))
  .catch((err) => {
    console.error('Failed to start:', err.message)
    process.exit(1)
  })
