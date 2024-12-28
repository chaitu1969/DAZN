"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.addMovie = exports.searchMovies = exports.movieList = void 0;
const movie_1 = __importDefault(require("../models/movie"));
const console_1 = require("console");
const movieList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movie_1.default.find();
        res.status(200).json({ MovieList: movies });
    }
    catch (error) {
        res.status(500).json({ Message: "Server Error", Error: error });
    }
});
exports.movieList = movieList;
const searchMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const movies = yield movie_1.default.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { genre: { $regex: q, $options: "i" } },
            ],
        });
        res.status(200).json({ Movies: movies });
    }
    catch (error) {
        res.status(500).json({ Message: "Server Error", Error: error });
    }
});
exports.searchMovies = searchMovies;
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, genre, rating, streamingLink } = req.body;
        if (!title || !genre || !rating || !streamingLink) {
            res.status(400).json({ Error: "All fields are required" });
        }
        else {
            const newMovie = new movie_1.default({ title, genre, rating, streamingLink });
            yield newMovie.save();
            res.status(201).json({ Message: "Movie Created", Movie: newMovie });
        }
    }
    catch (error) {
        res.status(500).json({ Message: "Failed to add movie", Error: error });
    }
});
exports.addMovie = addMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateMovie = yield movie_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updateMovie) {
            res.status(404).json({ Message: "Movie not found", Error: console_1.error });
        }
        else {
            res.status(200).json({ Message: "Movie Updated", NewData: updateMovie });
        }
    }
    catch (error) {
        res.status(500).json({ Message: "Failed to update movie", Error: error });
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedMovie = yield movie_1.default.findByIdAndDelete(id);
        if (!exports.deleteMovie) {
            res.status(404).json({ Message: "Movie not found" });
        }
        else {
            res.status(200).json({ Message: "Movie delete successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ Message: "Failed to delete movie", Error: error });
    }
});
exports.deleteMovie = deleteMovie;
