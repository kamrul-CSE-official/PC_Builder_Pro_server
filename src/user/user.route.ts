import express from "express";
import asyncHandler from "../middleware/asyncHandler";
import userController from "./user.controller";

const router = express.Router();

const routes = [
  {
    method: "GET",
    path: "/",
    controller: userController.allusersController,
  },
  {
    method: "GET",
    path: "/purchases/:userId",
    controller: userController.getProductsBoughtByUserController,
  },
  {
    method: "POST",
    path: "/register",
    controller: userController.registerUserController,
  },
  {
    method: "POST",
    path: "/login",
    controller: userController.loginUserController,
  },
];

routes.forEach(({ method, path, controller }) => {
  switch (method) {
    case "GET":
      router.get(path, asyncHandler(controller));
      break;
    case "POST":
      router.post(path, asyncHandler(controller)); 
      break;
    default:
      console.error(`Unsupported HTTP method: ${method}`);
  }
});

export default router;
