import { Response } from "express";

interface ApiResponse {
  message: string;
  status: number;
  data?: any;
}

export const sendApiResponse = (res: Response, apiResponse: ApiResponse) => {
  res.status(apiResponse.status).json(apiResponse);
};
