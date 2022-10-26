const express = require('express')
const route = express.Router()
const url = require('../../models/url')

route.get('/:id', (req, res) => {
  const id = req.params.id
  url
    .findOne({ id })
    .then(data => {
      if (data) {
        const destination = data.url
        res.redirect(destination)
      } else {
        res.redirect('/')
      }
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = route
