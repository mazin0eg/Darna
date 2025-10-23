import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validatorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error(errors.array()[0].msg, 400);
  }
  next();
};
