import express from "express";
import {
  movieList,
  searchMovies,
  addMovie,
  deleteMovie,
  updateMovie,
} from "../controllers/movieController";
import { adminAuth } from "../middlewares/auth";

const router = express.Router();

router.get("/movies", movieList);
router.get("/search", searchMovies);
router.post("/movies", adminAuth, addMovie);
router.put("/movies/:id", adminAuth, updateMovie);
router.delete("/movies/:id", adminAuth, deleteMovie);

export default router;
