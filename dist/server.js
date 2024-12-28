"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const movieRouter_1 = __importDefault(require("./routes/movieRouter"));
dotenv_1.default.config();
const PORT = process.env.PORT;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.urlencoded({ extended: true }));
(0, db_1.connectDB)();
exports.app.use("/api", movieRouter_1.default);
exports.server = exports.app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
