const express = require("express");
const router = express.Router();
const db = require("../db/MongoUtils");
/* GET home page. */
router.get("/", (req, res) => res.send("Hello World!"));

// Register a new user
router.post("/new", (req, res) => {
  db.insertOne(
    (user) => {
      res.send(user);
    },
    "users",
    req.body.user
  );
});

// Get user
router.post("/", (req, res) => {
  db.findOne(req.body.user, "users", (user) => res.send(user));
});

module.exports = router;
