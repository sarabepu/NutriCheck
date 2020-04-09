var express = require("express");
var router = express.Router();
var db = require("../db/MongoUtils")
/* GET home page. */
router.get("/", (req, res) => res.send('Hello World!'));
router.post("/new",(req,res) =>{
    db.insertOne((user)=>res.send(user),'users',req.body.user)
})

module.exports = router;