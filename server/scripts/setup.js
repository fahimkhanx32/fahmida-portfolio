// Creates server/.env from .env.example with a freshly generated JWT secret.  Usage: npm run setup
const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')

const root = path.join(__dirname, '..')
const target = path.join(root, '.env')
if (fs.existsSync(target)) {
  console.log('.env already exists, left untouched.')
  process.exit(0)
}
const secret = crypto.randomBytes(48).toString('hex')
const text = fs.readFileSync(path.join(root, '.env.example'), 'utf8').replace(/^JWT_SECRET=.*$/m, `JWT_SECRET=${secret}`)
fs.writeFileSync(target, text)
console.log('Created server/.env with a new JWT_SECRET. Check MONGODB_URL, then run: npm run seed:admin')
