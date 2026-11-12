const mongoose = require('mongoose')
const ApiError = require('../utils/ApiError')

module.exports = (req, _res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(400, 'Invalid id')
  next()
}
