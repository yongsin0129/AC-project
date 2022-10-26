const mongoose = require('mongoose')
const { Schema } = mongoose

const url = new Schema({
  id: String,
  url: String
})

module.exports = mongoose.model('url', url)
