const express = require('express')
const exphbs = require('express-handlebars').engine
const app = express()
const port = 3000
const movies = require('./movies.json').results

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home', { movies })
})

app.get('/movies/:movieid', (req, res) => {
  const selectedMovieid = Number(req.params.movieid) - 1
  const selectedMovie = movies[selectedMovieid]
  res.render('show', { selectedMovie })
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const searchMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(keyword)
  })
  res.render('home', { movies: searchMovies, keyword })
})

app.listen(port, () => {
  console.log('server is listening on port http://localhost:3000')
})
