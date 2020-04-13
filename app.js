const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "front/build")));

const configPassport = require("./configurePassport.js");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());

configPassport(app);

const indexRouter = require("./routes/index");

const usersRouter = require("./routes/users");
const ingredientsRouter = require("./routes/ingredients");

const passportRouter = require("./routes/passport");

app.use("/", indexRouter);
app.use("/", passportRouter);
app.use("/user", usersRouter);
app.use("/ingredients", ingredientsRouter);

module.exports = app;
// const port = 3000;
// app.listen(port, () => console.log(`App listening on ${port}`));
