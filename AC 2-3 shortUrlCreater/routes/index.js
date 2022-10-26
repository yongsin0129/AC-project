const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const finished = require('./modules/finished')
const URL = require('./modules/URLtransfer')

router.use('/', home)
router.use('/finished', finished)
router.use('/URLtransfer', URL)

module.exports = router
