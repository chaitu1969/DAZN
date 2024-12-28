import { Request, Response, NextFunction } from "express";

export const adminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userRole = req.headers["role"];
  if (userRole === "admin") {
    return next();
  } else {
    res.status(403).json({ Message: "Unauthorized" });
  }
};
