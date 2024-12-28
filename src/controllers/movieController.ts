import { Request, Response } from "express";
import movie from "../models/movie";
import { error } from "console";

export const movieList = async (req: Request, res: Response) => {
  try {
    const movies = await movie.find();
    res.status(200).json({ MovieList: movies });
  } catch (error) {
    res.status(500).json({ Message: "Server Error", Error: error });
  }
};

export const searchMovies = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const movies = await movie.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { genre: { $regex: q, $options: "i" } },
      ],
    });
    res.status(200).json({ Movies: movies });
  } catch (error) {
    res.status(500).json({ Message: "Server Error", Error: error });
  }
};

export const addMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, genre, rating, streamingLink } = req.body;
    if (!title || !genre || !rating || !streamingLink) {
      res.status(400).json({ Error: "All fields are required" });
    } else {
      const newMovie = new movie({ title, genre, rating, streamingLink });
      await newMovie.save();
      res.status(201).json({ Message: "Movie Created", Movie: newMovie });
    }
  } catch (error) {
    res.status(500).json({ Message: "Failed to add movie", Error: error });
  }
};

export const updateMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateMovie = await movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateMovie) {
      res.status(404).json({ Message: "Movie not found", Error: error });
    } else {
      res.status(200).json({ Message: "Movie Updated", NewData: updateMovie });
    }
  } catch (error) {
    res.status(500).json({ Message: "Failed to update movie", Error: error });
  }
};

export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedMovie = await movie.findByIdAndDelete(id);

    if (!deleteMovie) {
      res.status(404).json({ Message: "Movie not found" });
    } else {
      res.status(200).json({ Message: "Movie delete successfully" });
    }
  } catch (error) {
    res.status(500).json({ Message: "Failed to delete movie", Error: error });
  }
};
