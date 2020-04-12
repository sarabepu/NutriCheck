var express = require("express");
var router = express.Router();
var db = require("../db/MongoUtils")
/* GET home page. */
router.get("/", (req, res) => res.send('Hello World!'));

// Register a new user
router.post("/new", (req, res) => {
    usuario = req.body.user
    db.insertOne((user) => {
        res.send(user)
    }, 'users', usuario)

});

// Get user
router.post("/profile", (req, res) => {
    db.findOne((user) => res.send(user), 'users',req.body.user)
});
// Get users
router.post("/", (req, res) => {
    db.findMany( (user) => res.send(user),'users',req.body.user)
});






module.exports = router;