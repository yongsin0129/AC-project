const mongoose = require('mongoose')

const Schema = mongoose.Schema

const user = new Schema({
  firstName: { type: String, require },
  email: { type: String, require },
  password: { type: String, require }
})

module.exports = mongoose.model('users', user)
