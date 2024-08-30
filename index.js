import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const baseURL = "https://pokeapi.co/api/v2/pokemon";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/pokemon", async (req, res) => {
  const pokemonName = req.body.pokemonName;
  try {
    const respone = await axios.get(`${baseURL}/${pokemonName}`);
    res.render("index.ejs", (pokemon = response.data));
  } catch (error) {
    console.log(error);
    res.status(404).send("Pokemon not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
