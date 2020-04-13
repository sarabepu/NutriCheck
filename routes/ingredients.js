const express = require("express");
const router = express.Router();
const db = require("../db/MongoUtils");
const APIClient = require("../apiClient");

// Get ingredients
router.get("/", (req, res) => {
  db.findMany({}, "ingredients", (ingredients) => res.send(ingredients));
});

router.post("/generate", function (req, res) {
  APIClient.generateMeals(req.body.calories, req.body.diet, req.body.query)
    .then((res) => res.data)
    .then((meals) => res.send(meals));
});

module.exports = router;
