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
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = require("../server");
const movie_1 = __importDefault(require("../models/movie"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.MONGO_URL;
describe("Movie Controller", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(url);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield movie_1.default.deleteMany({});
        yield movie_1.default.insertMany([
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
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
        yield server_1.server.close();
    }));
    it("should list all movies", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).get("/api/movies");
        expect(res.status).toBe(200);
        expect(res.body.MovieList.length).toBe(2);
        expect(res.body.MovieList[0]).toHaveProperty("title", "Bahubali");
    }));
    it("should search movies by title", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).get("/api/search?q=Bahubali");
        expect(res.status).toBe(200);
        expect(res.body.Movies.length).toBe(1);
        expect(res.body.Movies[0]).toHaveProperty("title", "Bahubali");
    }));
    it("should add a new movie with admin role", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app)
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
    }));
    it("should update an existing movie", () => __awaiter(void 0, void 0, void 0, function* () {
        const findmovie = yield movie_1.default.findOne({ title: "Bahubali" });
        const res = yield (0, supertest_1.default)(server_1.app)
            .put(`/api/movies/${findmovie === null || findmovie === void 0 ? void 0 : findmovie._id}`)
            .set("role", "admin")
            .send({ rating: 4.8 });
        expect(res.status).toBe(200);
        expect(res.body.NewData).toHaveProperty("rating", 4.8);
    }));
    it("should delete a movie with admin role", () => __awaiter(void 0, void 0, void 0, function* () {
        const findMovie = yield movie_1.default.findOne({ title: "Bahubali" });
        const res = yield (0, supertest_1.default)(server_1.app)
            .delete(`/api/movies/${findMovie === null || findMovie === void 0 ? void 0 : findMovie._id}`)
            .set("role", "admin");
        expect(res.status).toBe(200);
        expect(res.body.Message).toBe("Movie delete successfully");
    }));
});
