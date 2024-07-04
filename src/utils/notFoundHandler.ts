import { Request, Response, NextFunction } from "express";
import { handleError } from "./responseHandler";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  handleError(res, new Error("Not Found"), 404, "API endpoint not found");
};

export default notFoundHandler;
