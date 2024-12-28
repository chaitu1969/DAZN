"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("Movie", movieSchema);
