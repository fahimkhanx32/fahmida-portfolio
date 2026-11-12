const fs = require('node:fs/promises')
const path = require('node:path')
const Cv = require('../models/Cv')
const ApiError = require('../utils/ApiError')
const { CV_DIR } = require('../middleware/uploadCv')

const DOWNLOAD_NAME = 'Dr-Fahmida-Bristy-CV.pdf'
const filePathOf = (cv) => path.join(CV_DIR, cv.storedName)
const removeFile = (p) => fs.unlink(p).catch(() => {})

/** Public: tells the site whether a CV exists (used to enable the Download CV button). */
async function getInfo(_req, res) {
  const cv = await Cv.findOne({ key: 'current' })
  if (!cv) return res.json({ success: true, data: { available: false } })
  res.json({
    success: true,
    data: { available: true, size: cv.size, updatedAt: cv.updatedAt, downloadUrl: '/api/cv/download' },
  })
}

/** Public: streams the current CV as a PDF download. */
async function download(_req, res) {
  const cv = await Cv.findOne({ key: 'current' })
  if (!cv) throw new ApiError(404, 'No CV has been uploaded yet')
  res.type('application/pdf')
  res.download(filePathOf(cv), DOWNLOAD_NAME, (err) => {
    if (err && !res.headersSent) res.status(404).json({ success: false, message: 'CV file is missing' })
  })
}

/** Admin: upload or replace the CV (multipart field "file", PDF, max 5 MB). */
async function upload(req, res) {
  if (!req.file) throw new ApiError(400, 'Attach a PDF in the "file" field')

  // Content-Type is client-supplied, so also check the real PDF signature.
  const fh = await fs.open(req.file.path, 'r')
  const head = Buffer.alloc(5)
  await fh.read(head, 0, 5, 0)
  await fh.close()
  if (head.toString('latin1') !== '%PDF-') {
    await removeFile(req.file.path)
    throw new ApiError(400, 'File is not a valid PDF')
  }

  const previous = await Cv.findOne({ key: 'current' })
  const cv = await Cv.findOneAndUpdate(
    { key: 'current' },
    { storedName: req.file.filename, originalName: req.file.originalname, size: req.file.size, uploadedBy: req.user.id },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  )
  if (previous && previous.storedName !== cv.storedName) await removeFile(filePathOf(previous))

  res.status(201).json({
    success: true,
    message: 'CV uploaded',
    data: { originalName: cv.originalName, size: cv.size, updatedAt: cv.updatedAt, downloadUrl: '/api/cv/download' },
  })
}

/** Admin: delete the current CV. */
async function remove(_req, res) {
  const cv = await Cv.findOneAndDelete({ key: 'current' })
  if (!cv) throw new ApiError(404, 'No CV to delete')
  await removeFile(filePathOf(cv))
  res.json({ success: true, message: 'CV deleted' })
}

module.exports = { getInfo, download, upload, remove }
