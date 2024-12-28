import mongoose from "mongoose";
import { app, server } from "../server";
import movie from "../models/movie";
import supertest from "supertest";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL as string;

describe("Movie Controller", () => {
  beforeAll(async () => {
    await mongoose.connect(url);
  });

  beforeEach(async () => {
    await movie.deleteMany({});
    await movie.insertMany([
      {
        title: "Bahubali",
        genre: "Drama",
        rating: 4.8,
        streamingLink: "https://www.netflix.com/Bahubali",
      },
      {
        title: "Avengers",
        genre: "Sci-Fi",
        rating: 4.7,
        streamingLink: "https://www.netflix.com/Avengers",
      },
    ]);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  it("should list all movies", async () => {
    const res = await supertest(app).get("/api/movies");
    expect(res.status).toBe(200);
    expect(res.body.MovieList.length).toBe(2);
    expect(res.body.MovieList[0]).toHaveProperty("title", "Bahubali");
  });

  it("should search movies by title", async () => {
    const res = await supertest(app).get("/api/search?q=Bahubali");

    expect(res.status).toBe(200);
    expect(res.body.Movies.length).toBe(1);
    expect(res.body.Movies[0]).toHaveProperty("title", "Bahubali");
  });

  it("should add a new movie with admin role", async () => {
    const res = await supertest(app)
      .post("/api/movies")
      .set("role", "admin")
      .send({
        title: "Avatar",
        genre: "Sci-Fi",
        rating: 4.9,
        streamingLink: "https://www.disney.com/avatar",
      });
    expect(res.status).toBe(201);
    expect(res.body.Movie).toHaveProperty("title", "Avatar");
  });

  it("should update an existing movie", async () => {
    const findmovie = await movie.findOne({ title: "Bahubali" });
    const res = await supertest(app)
      .put(`/api/movies/${findmovie?._id}`)
      .set("role", "admin")
      .send({ rating: 4.8 });
    expect(res.status).toBe(200);
    expect(res.body.NewData).toHaveProperty("rating", 4.8);
  });

  it("should delete a movie with admin role", async () => {
    const findMovie = await movie.findOne({ title: "Bahubali" });
    const res = await supertest(app)
      .delete(`/api/movies/${findMovie?._id}`)
      .set("role", "admin");
    expect(res.status).toBe(200);
    expect(res.body.Message).toBe("Movie delete successfully");
  });
});
