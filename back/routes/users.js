const express = require("express");
const router = express.Router();
const db = require("../db/MongoUtils");

/* GET home page. */
router.get("/", (req, res) => res.send("Hello World!"));

// Register a new user
router.post("/new", (req, res) => {
  usuario = req.body.user;
  db.insertOne(usuario, "users", (user) => {
    res.send(user);
  });
});

// Get user
router.post("/profile", (req, res) => {
  db.findOne(req.body.user, "users", (user) => res.send(user));
});

router.post("/update",(req,res)=>{
    db.updateOne(req.body.filter, req.body.query, 'users', (data) => res.send(data));
});
// Get users
router.post("/", (req, res) => {
  db.findMany(req.body.user, "users", (user) => res.send(user));
});

// Update list
router.put("/:username", function (req, res) {
  let object = req.body.object;
  let name = req.body.name;
  db.findOne({ username: req.params.username }, "users", (user) => {
    let list = {};
    list[name] = object;
    let update = { $set: list };

    db.updateOne(
      (user) => {
        res.send(user);
      },
      "users",
      { username: req.params.username },
      update
    );
  });
});

module.exports = router;
