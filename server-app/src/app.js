/** npm module imports */
const path=require("path");
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


/** Source code imports */
// Mongoose models
const User = require('./api/models/user');
const Book = require('./api/models/book');

//const UserModel = require('./api/models/user')

// Routes
const routes = require('./api/routes/v1');

// Miscellaneos
const USERS = require('./test/data/users');

const BOOKS = require('./test/data/books');

var cors = require('cors');

// db config
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

//const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const DB_URL = process.env.DB_URL;
//const DB_URL=`mongodb://localhost:27017/capstone`;

/** Connect to our MongoDB database  
 **/

 mongoose.connect(process.env.DB_URL)
  .then(()=> console.log('Connected to MongoDB'))
// Configure mongoose to tell us if we succeed or if we fail to connect to the database
mongoose.connection.on('open', () => `MongoDB: Successfully connected to ${DB_URL}`);
mongoose.connection.on('error', (error) => `MongoDB: Failed to connected to ${DB_URL}. Error ${error}`);

// IMPORTANT: If you are connecting to a database on your local machine be sure it is running first.
// We have to do this before we can save any Models to the database or get data from database.
console.log('MongoDB: Attempting to connect ...');
// mongoose
//   .connect(`mongodb://localhost:27017/capstone`)
//   // handle error messages after successfully connectiong
//   .catch(error => console.error(`MongoDB: Error ${error}`));


// Create some test data in the database for our app
USERS.forEach(item => {
  const itemModel = new User({ username: item.username, email: item.email, password: item.password });
 
  itemModel
    .save() 
    .catch(error => {
      console.log(`MongoDB: Error on save: `, error.errmsg);
    })
});

BOOKS.forEach(item => {
  const itemModel = new Book({ name: item.name, author: item.author, type: item.type, price: item.price});
 
  itemModel
    .save() 
    .catch(error => {
      console.log(`MongoDB: Error on save: `, error.errmsg);
    })
});
// express server config
const PORT = process.env.PORT;

console.log('starting express')
const app = express();

/** 
 * Configure express server middleware 
 **/

// this allows us to parse HTTP POST request bodies 
app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')))

// For development - console each HTTP request to the server
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} with param ${JSON.stringify(req.params)}`);
  // For things like POST requests that have a body in the HTTP request, print that too
  if (req.body) {
    console.log(JSON.stringify(req.body));
    next();  
  }
  
  });

  // We need to call next() to tell express that our middleware function here is done and
  // that express should pass the request on to the next handling function - which will either
  // be more middleware or our routing code!
  

/** Express server routes */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

/** Mount all our various API routes here */
app.use('/v1', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


/** Start express server  */
app.listen(PORT, () => {
  console.log(`Example app listening `)
  /* at http://localhost:${PORT}*/
})