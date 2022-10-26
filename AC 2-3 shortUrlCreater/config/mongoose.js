const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL_YS)
const db = mongoose.connection

db.on('error', err => console.log(err))

db.once('open', () => console.log('mongoose connection ok!'))

module.exports = mongoose
