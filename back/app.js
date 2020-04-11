const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

app.use(cors());

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