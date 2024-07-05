import { NextFunction, Response } from "express";

export const handleSuccess = (
  res: Response,
  data: any,
  message: string = "Success"
) => {
  res.status(200).json({
    status: "success",
    message,
    data,
  });
};

export const handleError = (
  res: Response,
  error: any,
  statusCode: number = 500,
  message: string = "An error occurred"
) => {
  if (error && error.errors) {
    const validationErrors = error.errors.map((err: any) => err.message);
    res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: validationErrors,
    });
  } else {
    res.status(statusCode).json({
      status: "error",
      message,
      error: error.message || error,
    });
  }
};

export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
