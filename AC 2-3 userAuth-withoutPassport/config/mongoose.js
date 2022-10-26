require('dotenv').config()
const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_URI_users)
  .then(() => {
    console.log('mongoose ok !')
  })
  .catch(error => {
    console.log('mongoose NG !')
    console.log(error)
  })

module.exports = mongoose
