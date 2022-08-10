const mongoose = require('mongoose')

const connectDB = (url) => {
  console.log('SERVER ON ...')
  return mongoose.connect(url)
}

module.exports = connectDB
