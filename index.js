const express     = require('express')
const mongoose    = require('mongoose')
const router      = require('./routes/authRouter')
const postRouter  = require('./routes/postsRouter')
                    require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json())


// ---------------------------

// Before building

// const cors        = require('cors')

// app.use(cors({ 
//   origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
//   credentials: true
// }));
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', true);
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   next();
// });

// ---------------------------


app.use('/api', router);
app.use('/apiposts', postRouter)


// ---------------------------

// After building

app.set('views', './public')
app.use(express.static(__dirname + '/public'))
app.get('/*', (req, res) => {
  res.sendFile('./public/index.html',  { root: __dirname })
})

// ---------------------------

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT
    // , () => console.log(
      // `\n\n---- Server started on ${PORT} ----\n\n`) //Disable for test
    )
  } catch (err) {
    console.log(err)
  }
}

start()

module.exports = app // for test