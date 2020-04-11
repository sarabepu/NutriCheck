const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

// create application/json parser
app.use(bodyParser.json())

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }))

var indexRouter = require("./routes/index");

var usersRouter = require("./routes/users");

app.use("/", indexRouter);
app.use("/user", usersRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))