import express from "express";
import asyncHandler from "../middleware/asyncHandler";
import productController from "./product.controller";

const router = express.Router();

const routes = [
  {
    method: "GET",
    path: "/",
    controller: productController.getAllProductsController,
  },
  {
    method: "GET",
    path: "/brand-name",
    controller: productController.getAllBrandNameController,
  },
  {
    method: "POST",
    path: "/add-products",
    controller: productController.addMultipleProducts,
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
