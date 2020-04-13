const express = require("express");
const router = express.Router();
const db = require("../db/MongoUtils");
/* GET home page. */
router.get("/", (req, res) => res.send("Hello World!"));

// Register a new user
router.post("/new", (req, res) => {
    usuario = req.body.user
    db.insertOne(usuario,'users',(user) => {
        res.send(user)
    } )

});

// Get user
router.post("/profile", (req, res) => {
    db.findOne(req.body.user,'users',(user) => res.send(user))
});

router.post("/update",(req,res)=>{
    db.updateOne(req.body.filter, req.body.query, 'users', (data) => res.send(data));
});
// Get users
router.post("/", (req, res) => {
    db.findMany(req.body.user,'users', (user) => res.send(user))});






module.exports = router;
