const express = require("express");
const app = express();
const path = require("path")
const axios = require('axios');
const port = process.env.PORT || 3000

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("search")
});

app.get("/results", async (req, res) => {
    try {
        const query = req.query.search;
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ja&query=${query}`);
        const data = response.data.results
        res.render("movies", {data, searchQuery:query})
    } catch (error) {
          if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    }
})

app.listen(port, () => {
    console.log("Server started")
})