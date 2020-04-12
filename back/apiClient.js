const axios = require("axios");
let translateKey = `${process.env.translateKey}`;

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

  return client;
}

module.exports = APIClient();
