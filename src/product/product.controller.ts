import { Request, Response } from "express";
import { sendApiResponse } from "../utils/apiResponse";
import productService from "./product.service";

const addMultipleProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.addMultipleProductsService(req.body);
    sendApiResponse(res, {
      message: "Successfully added products.",
      status: 200,
      data: result,
    });
  } catch (err: any) {
    sendApiResponse(res, {
      message: "Failed to add products.",
      status: 500,
    });
  }
};

const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProductsService();
    sendApiResponse(res, {
      message: "Successfully get all products.",
      status: 200,
      data: result,
    });
  } catch (err: any) {
    sendApiResponse(res, {
      message: "Failed to get products.",
      status: 500,
    });
  }
};

const getAllBrandNameController = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllBrandNameService();
    sendApiResponse(res, {
      message: "Successfully get all products brand name.",
      status: 200,
      data: result,
    });
  } catch (err: any) {
    sendApiResponse(res, {
      message: "Failed to get products brand name.",
      status: 500,
    });
  }
};

const productController = {
  addMultipleProducts,
  getAllProductsController,
  getAllBrandNameController,
};

export default productController;
