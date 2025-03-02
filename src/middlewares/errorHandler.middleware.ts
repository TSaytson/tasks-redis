import { NextFunction, Request, Response } from "express";
import { AppError, errorStatusCode, isAppError } from "../helpers/errorHelper";

export function errorHandlerMiddleware(error: AppError,
  req: Request,
  res: Response,
  next: NextFunction) {
  console.log(error);
  if (isAppError(error)) {
    const { type, message } = error;
    const statusCode = errorStatusCode(type);
    res.status(statusCode).send({ message });
    return;
  }
  res.status(500).send(error.message);
}