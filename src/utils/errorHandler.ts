import { Request, Response, NextFunction } from "express";
import { handleError } from "./responseHandler";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "An unexpected error occurred";
  handleError(res, err, statusCode, message);
};

export default errorHandler;
