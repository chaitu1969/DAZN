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
const movie_1 = __importDefault(require("../../../models/movie"));
describe("Movie model", () => {
    // Checking for valid movie object
    it("should check a correct movie object", () => __awaiter(void 0, void 0, void 0, function* () {
        const validMovie = new movie_1.default({
            title: "RRR",
            genre: "Drama",
            rating: 4.8,
            streamingLink: "https://www.nextflix.com/rrr",
        });
        yield expect(validMovie.validate()).resolves.not.toThrow();
    }));
    //   check for missing required field
    it("should throw valid error for missing required field", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalid = new movie_1.default({});
        yield expect(invalid.validate()).rejects.toThrow();
    }));
    // //   Check for invalid type
    // it("should throw validation error for invalid type", () => {
    //   const invalidMovie = new movie({
    //     title: "RRR",
    //     genre: "Invalid",
    //     rating: "A string",
    //     streamingLink: "https://www.nextflix.com/rrr",
    //   });
    //   try {
    //     invalidMovie.validateSync();
    //   } catch (error) {
    //     console.error(error);
    //   }
    //   expect(() => invalidMovie.validateSync()).toThrow();
    // });
});
