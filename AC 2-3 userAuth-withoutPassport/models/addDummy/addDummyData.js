const mongoose = require('../../config/mongoose')
const dummyData = require('./usersDummyData.json')
const users = require('../users')

const db = mongoose.connection

db.on('error', err => console.error(err))
db.once('open', async () => {
  await users.deleteMany()
  for (let i = 0; i < dummyData.length; i++) {
    await users.create(dummyData[i])
  }
  db.close()
  console.log('dummyData created !')
})
