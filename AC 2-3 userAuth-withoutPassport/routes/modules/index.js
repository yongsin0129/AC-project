const express = require('express')
const router = express.Router()
const Users = require('../../models/users')

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    // 使用者到本網站先檢查其 cookie (req.cookies)
    const sessionId = req.cookies.sessionId
    // 如果 cookie 內的資料有效 (req.session)
    if (req.session[sessionId]) {
      const userId = req.session[sessionId].userId
      const user = await Users.findOne({ _id: userId })
      if (user) {
        return res.render('welcome', { firstName: user.firstName })
      }
    }
    const query = req.query.msg
    res.render('index', { query })
  } catch (err) {
    console.log(err)
    next()
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Users.findOne({ email })
    // 帳號密碼不對
    if (user === null || password !== user.password) {
      const msg = 'wrong email or password'
      res.redirect('/?msg=' + msg)
      // 登入成功
    } else {
      const sessionId = req.session.id
      // 將 sessionId 與 資料庫資料 綁一起
      req.session[sessionId] = { userId: user._id }
      // 將 sessionId 當 cookie 資料傳給 client 的 browser
      res.cookie('sessionId', sessionId)
      res.render('welcome', { firstName: user.firstName })
    }
  } catch (err) {
    console.log(err)
    next()
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('sessionId')
  res.redirect('/')
})

module.exports = router
