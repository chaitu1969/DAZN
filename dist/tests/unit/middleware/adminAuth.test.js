"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../../middlewares/auth");
describe("Admin Auth Middleware", () => {
    it("should call next if user is admin", () => {
        const req = { headers: { role: "admin" } };
        const res = {};
        const next = jest.fn();
        (0, auth_1.adminAuth)(req, res, next);
        expect(next).toHaveBeenCalled();
    });
    it("should return 403 if user is not admin", () => {
        const req = { headers: { role: "user" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        (0, auth_1.adminAuth)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ Message: "Unauthorized" });
        expect(next).not.toHaveBeenCalled();
    });
});
