const nodemailer = require('nodemailer')
const env = require('../config/env')

let transporter
const getTransporter = () =>
  (transporter ||= nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined,
  }))

/**
 * Sends the password-reset email. Without SMTP settings nothing is emailed:
 * in development the link is printed to the server console instead; in
 * production a warning is logged (the link is never logged there).
 */
async function sendResetEmail(to, link) {
  if (!env.smtp.host) {
    if (env.nodeEnv === 'production') console.warn('SMTP is not configured: password reset email was NOT sent')
    else console.log(`[dev] Password reset link for ${to}: ${link}`)
    return
  }
  await getTransporter().sendMail({
    from: env.smtp.from,
    to,
    subject: 'Reset your password',
    text: `Use this link to reset your password. It expires in 30 minutes.\n\n${link}\n\nIf you did not ask for this, ignore this email.`,
    html: `<p>Use this link to reset your password. It expires in 30 minutes.</p><p><a href="${link}">Reset password</a></p><p>If you did not ask for this, ignore this email.</p>`,
  })
}

module.exports = { sendResetEmail }
