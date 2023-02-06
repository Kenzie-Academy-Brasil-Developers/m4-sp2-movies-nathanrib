import express, { Application } from "express";
import { startDataBase } from "./database";
import { createMovie, deleteMovie, readAllMovies, updateMovie } from "./logic";
import { ensuranceMovieExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/movies", createMovie);
app.get("/movies", readAllMovies);
app.patch("/movies/:id", ensuranceMovieExists, updateMovie);
app.delete("/movies/:id", ensuranceMovieExists, deleteMovie);

app.listen("3000", async () => {
  await startDataBase();
  console.log("server is runnig");
});
