// Integration test. Needs a reachable MongoDB: MONGODB_URL=mongodb://127.0.0.1:27017/fahmida_test npm test
// Uses its own database and drops it afterwards, so point it at a throwaway DB name.
process.env.JWT_SECRET ||= 'test-secret-test-secret-test-secret-123456'
process.env.LOGIN_RATE_LIMIT ||= '100' // the real limit is 10 / 15 min
process.env.MONGODB_URL ||= 'mongodb://127.0.0.1:27017/fahmida_portfolio_test'

const { test, before, after } = require('node:test')
const assert = require('node:assert/strict')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/User')
const mailer = require('../src/utils/mailer')

let server, base, token
const PDF = () => new Blob(['%PDF-1.4\n%fake but valid signature\n'], { type: 'application/pdf' })
const json = (body, headers = {}) => ({ method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) })
const authed = (extra = {}) => ({ headers: { Authorization: `Bearer ${token}` }, ...extra })
const req = (path, opts) => fetch(base + path, opts)

before(async () => {
  await mongoose.connect(process.env.MONGODB_URL)
  await mongoose.connection.dropDatabase()
  await User.create({ name: 'Admin', email: 'admin@test.dev', username: 'drfahmida', passwordHash: await bcrypt.hash('correct-horse-battery', 10) })
  await new Promise((r) => (server = app.listen(0, r)))
  base = `http://127.0.0.1:${server.address().port}/api`
})

after(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
  server.close()
})

test('health', async () => assert.equal((await req('/health')).status, 200))

test('login rejects bad credentials, accepts good ones', async () => {
  assert.equal((await req('/auth/login', json({ identifier: 'admin@test.dev', password: 'wrong' }))).status, 401)
  assert.equal((await req('/auth/login', json({ identifier: 'nobody@test.dev', password: 'whatever' }))).status, 401)
  assert.equal((await req('/auth/login', json({ password: 'x' }))).status, 400)
  const r = await req('/auth/login', json({ identifier: 'ADMIN@test.dev', password: 'correct-horse-battery' }))
  assert.equal(r.status, 200)
  const body = await r.json()
  assert.ok(body.data.token)
  assert.equal(body.data.user.passwordHash, undefined)
  token = body.data.token
})

test('login by username; remember me gives a longer-lived token', async () => {
  const jwt = require('jsonwebtoken')
  const life = async (remember) => {
    const r = await req('/auth/login', json({ identifier: 'DrFahmida', password: 'correct-horse-battery', remember }))
    assert.equal(r.status, 200)
    const { exp, iat } = jwt.decode((await r.json()).data.token)
    return exp - iat
  }
  assert.equal(await life(false), 24 * 3600)
  assert.equal(await life(true), 7 * 24 * 3600)
})

test('protected routes need a valid token', async () => {
  assert.equal((await req('/auth/me')).status, 401)
  assert.equal((await req('/auth/me', { headers: { Authorization: 'Bearer garbage' } })).status, 401)
  assert.equal((await req('/appointments')).status, 401)
  assert.equal((await req('/messages')).status, 401)
  assert.equal((await req('/auth/me', authed())).status, 200)
})

test('CV: anonymous cannot upload; only real PDFs accepted; replace; download; delete', async () => {
  assert.equal((await (await req('/cv')).json()).data.available, false)
  assert.equal((await req('/cv/download')).status, 404)

  const form = () => { const f = new FormData(); f.append('file', PDF(), 'cv.pdf'); return f }
  assert.equal((await req('/cv', { method: 'POST', body: form() })).status, 401)

  const notPdfType = new FormData(); notPdfType.append('file', new Blob(['hello'], { type: 'text/plain' }), 'x.txt')
  assert.equal((await req('/cv', authed({ method: 'POST', body: notPdfType }))).status, 400)

  const fakePdf = new FormData(); fakePdf.append('file', new Blob(['not really a pdf'], { type: 'application/pdf' }), 'x.pdf')
  assert.equal((await req('/cv', authed({ method: 'POST', body: fakePdf }))).status, 400)

  const big = new FormData(); big.append('file', new Blob(['%PDF-' + 'a'.repeat(5.5 * 1024 * 1024)], { type: 'application/pdf' }), 'big.pdf')
  assert.equal((await req('/cv', authed({ method: 'POST', body: big }))).status, 413)

  assert.equal((await req('/cv', authed({ method: 'POST', body: form() }))).status, 201)
  assert.equal((await req('/cv', authed({ method: 'POST', body: form() }))).status, 201) // replace
  assert.equal((await (await req('/cv')).json()).data.available, true)

  const dl = await req('/cv/download')
  assert.equal(dl.status, 200)
  assert.equal(dl.headers.get('content-type'), 'application/pdf')
  assert.match(dl.headers.get('content-disposition'), /Dr-Fahmida-Bristy-CV\.pdf/)
  assert.ok((await dl.text()).startsWith('%PDF-'))

  assert.equal((await req('/cv', authed({ method: 'DELETE' }))).status, 200)
  assert.equal((await req('/cv/download')).status, 404)
})

test('appointments: validation, honeypot, admin list/update/delete', async () => {
  const tomorrow = new Date(Date.now() + 864e5).toISOString().slice(0, 10)
  const good = { name: 'Rahim Uddin', phone: '+880 1712-345678', petName: 'Bruno', petType: 'Dog', preferredDate: tomorrow, message: 'Vaccination' }

  assert.equal((await req('/appointments', json({ ...good, phone: 'abc' }))).status, 400)
  assert.equal((await req('/appointments', json({ ...good, preferredDate: '2020-01-01' }))).status, 400)
  const bot = await req('/appointments', json({ ...good, website: 'http://spam' }))
  assert.equal(bot.status, 201)

  const created = await req('/appointments', json({ ...good, status: 'confirmed' })) // status must not be client-settable
  assert.equal(created.status, 201)
  const { id, status } = (await created.json()).data
  assert.equal(status, 'pending')

  const list = await (await req('/appointments', authed())).json()
  assert.equal(list.data.total, 1) // honeypot submission not stored

  assert.equal((await req('/appointments?status=bogus', authed())).status, 400)
  assert.equal((await req(`/appointments/${id}`, authed({ method: 'PATCH', headers: { ...authed().headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'confirmed' }) }))).status, 200)
  assert.equal((await req('/appointments/not-an-id', authed({ method: 'DELETE' }))).status, 400)
  assert.equal((await req(`/appointments/${id}`, authed({ method: 'DELETE' }))).status, 200)
  assert.equal((await req(`/appointments/${id}`, authed({ method: 'DELETE' }))).status, 404)
})

test('messages: validation, honeypot, admin read/delete', async () => {
  const good = { name: 'Karim', email: 'karim@example.com', message: 'Hello doctor, a question.' }
  assert.equal((await req('/messages', json({ ...good, email: 'nope' }))).status, 400)
  assert.equal((await req('/messages', json({ ...good, website: 'x' }))).status, 201)
  assert.equal((await req('/messages', json(good))).status, 201)

  const list = await (await req('/messages', authed())).json()
  assert.equal(list.data.total, 1)
  const id = list.data.items[0]._id
  const patch = await req(`/messages/${id}`, authed({ method: 'PATCH', headers: { ...authed().headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ isRead: true }) }))
  assert.equal((await patch.json()).data.isRead, true)
  assert.equal((await req(`/messages/${id}`, authed({ method: 'DELETE' }))).status, 200)
})

test('NoSQL operator injection in login is rejected', async () => {
  const r = await req('/auth/login', json({ identifier: { $ne: null }, password: { $ne: null } }))
  assert.equal(r.status, 400)
})

test('changing password invalidates old tokens', async () => {
  const oldToken = token
  await new Promise((r) => setTimeout(r, 1100)) // token iat has 1s resolution
  const r = await req('/auth/change-password', { ...json({ currentPassword: 'correct-horse-battery', newPassword: 'a-much-better-pass-1' }, { Authorization: `Bearer ${oldToken}` }) })
  assert.equal(r.status, 200)
  const fresh = (await r.json()).data.token
  assert.equal((await req('/auth/me', { headers: { Authorization: `Bearer ${oldToken}` } })).status, 401)
  assert.equal((await req('/auth/me', { headers: { Authorization: `Bearer ${fresh}` } })).status, 200)
  assert.equal((await req('/auth/login', json({ identifier: 'admin@test.dev', password: 'a-much-better-pass-1' }))).status, 200)
})

test('unknown route and malformed JSON', async () => {
  assert.equal((await req('/nope')).status, 404)
  const r = await req('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' })
  assert.equal(r.status, 400)
})

test('forgot/reset password: generic answer, single-use token, bad tokens rejected', async () => {
  const sent = []
  const original = mailer.sendResetEmail
  mailer.sendResetEmail = async (to, link) => void sent.push({ to, link })
  try {
    const known = await req('/auth/forgot-password', json({ identifier: 'drfahmida' }))
    const unknown = await req('/auth/forgot-password', json({ identifier: 'ghost@test.dev' }))
    assert.equal(known.status, 200)
    assert.equal(unknown.status, 200)
    assert.deepEqual(await known.json(), await unknown.json()) // cannot be used to find accounts
    assert.equal(sent.length, 1)
    assert.equal(sent[0].to, 'admin@test.dev')

    const token = new URL(sent[0].link).searchParams.get('token')
    const reset = (t, password) => req('/auth/reset-password', json({ token: t, password }))
    assert.equal((await reset('x'.repeat(64), 'brand-new-password-9')).status, 400) // bad format
    assert.equal((await reset('a'.repeat(64), 'brand-new-password-9')).status, 400) // unknown token
    assert.equal((await reset(token, 'short')).status, 400)
    assert.equal((await reset(token, 'brand-new-password-9')).status, 200)
    assert.equal((await reset(token, 'another-password-99')).status, 400) // single use
    assert.equal((await req('/auth/login', json({ identifier: 'admin@test.dev', password: 'brand-new-password-9' }))).status, 200)
  } finally {
    mailer.sendResetEmail = original
  }
})

test('expired reset token is rejected', async () => {
  const sent = []
  const original = mailer.sendResetEmail
  mailer.sendResetEmail = async (to, link) => void sent.push(link)
  try {
    await req('/auth/forgot-password', json({ identifier: 'admin@test.dev' }))
    const token = new URL(sent[0]).searchParams.get('token')
    await User.updateOne({ email: 'admin@test.dev' }, { resetTokenExpires: new Date(Date.now() - 1000) })
    const r = await req('/auth/reset-password', json({ token, password: 'yet-another-pass-77' }))
    assert.equal(r.status, 400)
  } finally {
    mailer.sendResetEmail = original
  }
})

test('initial-password flag is cleared when the password is changed', async () => {
  await User.updateOne({ email: 'admin@test.dev' }, { passwordIsInitial: true })
  const login = await req('/auth/login', json({ identifier: 'admin@test.dev', password: 'brand-new-password-9' }))
  const t = (await login.json()).data.token
  const me = (token) => req('/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json())
  assert.equal((await me(t)).data.user.passwordIsInitial, true)
  const ch = await req('/auth/change-password', json({ currentPassword: 'brand-new-password-9', newPassword: 'Bristy123' }, { Authorization: `Bearer ${t}` }))
  assert.equal(ch.status, 200) // 9 characters is accepted (minimum is 8)
  assert.equal((await me((await ch.json()).data.token)).data.user.passwordIsInitial, false)
})
