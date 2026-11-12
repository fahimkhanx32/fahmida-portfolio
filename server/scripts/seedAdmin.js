// Creates (or resets the password of) the single admin account.
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='...' npm run seed:admin   (or set them in .env)
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
require('../src/config/env')
const User = require('../src/models/User')
const { BCRYPT_COST } = require('../src/controllers/authController')

async function main() {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD || ''
  const name = process.env.ADMIN_NAME || 'Dr. Fahmida Bristy'
  const username = (process.env.ADMIN_USERNAME || email.split('@')[0]).trim().toLowerCase()
  if (!email || password.length < 8) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 8 characters)')
  }
  await mongoose.connect(process.env.MONGODB_URL)
  const passwordHash = await bcrypt.hash(password, BCRYPT_COST)
  const existing = await User.findOne({ email })
  if (existing) {
    existing.passwordHash = passwordHash
    existing.name = name
    existing.username = username
    existing.passwordChangedAt = new Date()
    existing.passwordIsInitial = true
    await existing.save()
    console.log(`Updated admin: ${email} (username: ${username})`)
  } else {
    await User.create({ name, email, username, passwordHash, role: 'admin', passwordIsInitial: true })
    console.log(`Created admin: ${email} (username: ${username})`)
  }
  await mongoose.disconnect()
}

main().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
