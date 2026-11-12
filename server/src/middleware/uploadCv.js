const path = require('node:path')
const fs = require('node:fs')
const crypto = require('node:crypto')
const multer = require('multer')
const ApiError = require('../utils/ApiError')

const CV_DIR = path.join(__dirname, '..', '..', 'uploads', 'cv')
fs.mkdirSync(CV_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, CV_DIR),
  // Never trust the client file name: generate our own.
  filename: (_req, _file, cb) => cb(null, `${crypto.randomUUID()}.pdf`),
})

const uploadCv = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) =>
    file.mimetype === 'application/pdf' ? cb(null, true) : cb(new ApiError(400, 'Only PDF files are allowed')),
}).single('file')

module.exports = { uploadCv, CV_DIR }
