const express = require("express");
const router = express.Router();
const db = require("../db/MongoUtils");

// Get ingredients
router.get("/", (req, res) => {
  db.findMany({}, "ingredients", (ingredients) => res.send(ingredients));
});

module.exports = router;
