// app.js
// include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars').engine
const generatePassword = require('./generate_password')
const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))

// setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const options = req.body
  const password = generatePassword(options)
  res.render('index', { password, options })
})

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on http://localhot:${port}.`)
})
