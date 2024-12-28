import mongoose from "mongoose";

interface Movie {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const movieSchema = new mongoose.Schema<Movie>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
    enum: {
      values: ["Action", "Drama", "Comedy", "Horror", "Sci-Fi"],
      message: "Genre is not valid",
    },
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must not exceed 10"],
  },
  streamingLink: {
    type: String,
    required: [true, "Streaming link is required"],
  },
});

export default mongoose.model<Movie>("Movie", movieSchema);
