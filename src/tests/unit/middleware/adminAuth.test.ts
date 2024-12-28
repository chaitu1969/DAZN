import { adminAuth } from "../../../middlewares/auth";
import { Request, Response, NextFunction } from "express";

describe("Admin Auth Middleware", () => {
  it("should call next if user is admin", () => {
    const req = { headers: { role: "admin" } } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();
    adminAuth(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should return 403 if user is not admin", () => {
    const req = { headers: { role: "user" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    adminAuth(req as any, res as any, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ Message: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });
});
