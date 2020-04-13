const axios = require("axios");
const translateKey = `${process.env.translateKey}`;
const spoonKey = `${process.env.spoonKey}`;

function APIClient() {
  const client = {};

  client.translate = function (query) {
    return axios({
      method: "GET",
      url: "https://microsoft-azure-translation-v1.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "microsoft-azure-translation-v1.p.rapidapi.com",
        "x-rapidapi-key": translateKey,
        accept: "application/json",
      },
      params: {
        from: "en",
        to: "es",
        text: query,
      },
    })
      .then((response) => response.data)
      .then((s) => s.split(">")[1].split("<")[0]);
  };

  client.generateMeals = function (calories, diet, query) {
    return axios({
      method: "GET",
      url:
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": spoonKey,
      },
      params: {
        timeFrame: "week",
        targetCalories: calories,
        diet: "vegetarian",
        exclude: query,
      },
    });
  };

  return client;
}

module.exports = APIClient();
