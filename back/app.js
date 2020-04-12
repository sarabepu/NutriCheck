const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

var allowedOrigins = ['http://localhost:5000'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

const configPassport= require("./configurePassport.js");



const bodyParser =require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json())

configPassport(app);

var indexRouter = require("./routes/index");

var usersRouter = require("./routes/users");

var passportRouter = require("./routes/passport");

app.use("/", indexRouter);
app.use("/", passportRouter);
app.use("/user", usersRouter);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))