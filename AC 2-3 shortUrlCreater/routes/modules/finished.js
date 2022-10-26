const express = require('express')
const router = express.Router()
const URLto5DigitalWord = require('../../buffer')
const url = require('../../models/url')

router.get('/', (req, res) => {
  const input = req.query.input_URL
  const DigitalWord = URLto5DigitalWord(input)
  const shortURL = `http://localhost:3000/URLtransfer/${DigitalWord}`
  url.findOne({ id: DigitalWord }).then(data => {
    if (!data) {
      url.create({ id: DigitalWord, url: input })
      console.log(`created a new shortURL : ${shortURL}`)
    }
  })
  res.render('finished', { shortURL })
})

module.exports = router

/**
 * !在新增短網址時 url.findOne 和 res.render 是用同步的寫法，但 url.findOne 本身是非同步的行為，也就說 res.render 完全不會等 url.findOne 執行完其實就會回傳了，這在原本是會出問題的，但剛好你是用 Buffer 來產亂碼就不會有問題，因為相同的 input 進去 Buffer 是會給出一樣的結果的。
 */
