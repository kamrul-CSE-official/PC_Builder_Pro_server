import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userService from "./user.services";
import { sendApiResponse } from "../utils/apiResponse";

const prisma = new PrismaClient();

const registerUserController = async (req: Request, res: Response) => {
  try {
    const result = await userService.registerUserService(req.body);
    sendApiResponse(res, {
      message: "Successfully registered user.",
      status: 200,
      data: result,
    });
  } catch (error) {
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
    if (user) {
      const result = await userService.loginUserService(req.body);
      sendApiResponse(res, {
        message: "Successfully registered user.",
        status: 200,
        data: result,
      });
    } else {
      sendApiResponse(res, {
        message: "Create an account then login.",
        status: 500,
      });
    }
  } catch (error) {
    sendApiResponse(res, {
      message: "Failed to login user.",
      status: 500,
    });
  }
};

const allusersController = async (req: Request, res:Response)=>{
  try {
    const result = await userService.allUserGetService();
    sendApiResponse(res, {
      message: 'Successfully get all users.',
      status: 200,
      data: result,
    });
  } catch (error) {
    sendApiResponse(res, {
      message: 'Failed to get user.',
      status: 500,
    });
  }


}

const userController = {
    registerUserController,
    loginUserController,
    allusersController
}
export default userController;