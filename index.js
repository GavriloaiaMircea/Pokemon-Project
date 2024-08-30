import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const baseURL = "https://pokeapi.co/api/v2/pokemon";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.render("index.ejs", { pokemon: null, error: null });
});

// Handle POST request for Pokémon
app.post("/pokemon", async (req, res) => {
  const pokemonName = req.body.pokemon;
  if (!pokemonName) {
    return res.render("index.ejs", {
      pokemon: null,
      error: "Please enter a Pokémon name or ID",
    });
  }
  try {
    const response = await axios.get(`${baseURL}/${pokemonName}`);
    res.render("index.ejs", { pokemon: response.data, error: null });
  } catch (error) {
    console.log(error);
    res.render("index.ejs", { pokemon: null, error: "Pokémon not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
