import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userService from "./user.services";
import { sendApiResponse } from "../utils/apiResponse";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtToken";
import envConfig from "../config/env.config";

const prisma = new PrismaClient();

const registerUserController = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (user) {
      return sendApiResponse(res, {
        message: "User already exist.",
        status: 404,
      });
    }
    const result = await userService.registerUserService(req.body);
    sendApiResponse(res, {
      message: "Successfully registered user.",
      status: 200,
      data: result,
    });
  } catch (err: any) {
    sendApiResponse(res, {
      message: "Failed to register user.",
      status: 500,
    });
  }
};

const loginUserController = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      return sendApiResponse(res, {
        message: "User not found. Please register first.",
        status: 404,
      });
    }

    const isPasswordValid = await userService.loginUserService(req.body);
    if (!isPasswordValid) {
      return sendApiResponse(res, {
        message: "Invalid credentials.",
        status: 401,
      });
    }

    // Generate access token
    const accessToken = await generateAccessToken({
      key: "email",
      value: req.body.email,
    });

    // Generate refresh token
    const refreshToken = await generateRefreshToken({
      key: "email",
      value: req.body.email,
    });

    // Set refresh token as a cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: envConfig.nodeEnv === "production",
      sameSite: "strict",
      domain: "localhost",
    });

    sendApiResponse(res, {
      message: "Successfully logged in.",
      status: 200,
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    sendApiResponse(res, {
      message: "Failed to login user.",
      status: 500,
    });
  }
};

const allusersController = async (req: Request, res: Response) => {
  try {
    const result = await userService.allUserGetService();
    sendApiResponse(res, {
      message: "Successfully retrieved all users.",
      status: 200,
      data: result,
    });
  } catch (error) {
    sendApiResponse(res, {
      message: "Failed to retrieve users.",
      status: 500,
    });
  }
};

const getProductsBoughtByUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return sendApiResponse(res, {
        message: "Buyer ID is required",
        status: 400,
      });
    }

    const sales = await userService.getProductsBoughtByUserService(userId);
    return sendApiResponse(res, {
      message: "Successfully retrieved products bought by user",
      status: 200,
      data: sales,
    });
  } catch (error) {
    return sendApiResponse(res, {
      message: "Failed to retrieve products bought by user",
      status: 500,
    });
  }
};

const userController = {
  registerUserController,
  loginUserController,
  allusersController,
  getProductsBoughtByUserController,
};

export default userController;
