const mongoose = require('mongoose')
const { mongoUrl } = require('./env')

async function connectDb() {
  await mongoose.connect(mongoUrl)
  console.log('MongoDB connected')
}

module.exports = connectDb
