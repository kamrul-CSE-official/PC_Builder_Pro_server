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
    path: "/best-sell",
    controller: productController.getBestSellingProductsController,
  },
  {
    method: "GET",
    path: "/search/:key",
    controller: productController.getSearchProductController,
  },
  {
    method: "GET",
    path: "/brand-name/:type",
    controller: productController.getAllBrandNameController,
  },
  {
    method: "POST",
    path: "/add-products",
    controller: productController.addMultipleProducts,
  },
  {
    method: "POST",
    path: "/buy",
    controller: productController.buyProductCOntroller,
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
