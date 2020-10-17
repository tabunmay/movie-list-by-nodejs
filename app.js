// 載入express
const express = require('express')
const app = express()

// 宣告伺服器變數
const port = 3000

// 載入express handlebars
const exphbs = require('express-handlebars')

// 載入電影資料
const movieList = require('./movies.json')


// 設定express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 設定路由提供靜態檔案
app.use(express.static('public'))

// 設定index路由
app.get('/', (req, res) =>{
  res.render('index', { movies: movieList.results })
})

//  設定searchbar路由
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: keyword })  
})

// 設定show路由
app.get('/movies/:movie_id', (req, res) => {
  
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)  
  res.render('show', { movie: movie })
})



// 啟動並監聽伺服器
app.listen(port, () =>{
  console.log(`Express is listening on localhost:${port}`)
})
