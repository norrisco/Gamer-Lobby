let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');
  const dotenv = require('dotenv');

  //Grabs the .env file
  dotenv.config();

// Connecting mongoDB
mongoose.Promise = global.Promise;
/*
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => console.log('Connected to cloud db'));
*/ 
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

// Set up express js port
const playerRoute = require('../backend/routes/player.route')
const gamesRoute = require('../backend/routes/games.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/angular8-meanstack-angular-material')));
app.use('/', express.static(path.join(__dirname, 'dist/angular8-meanstack-angular-material')));
app.use('/api', playerRoute)
app.use('/api/games', gamesRoute)

//Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
//Route Middlewares (To go to register its '/api/auth/register')
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});