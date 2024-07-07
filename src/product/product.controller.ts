import { Request, Response } from "express";
import { Types } from "@prisma/client";
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
    let { type } = req.params;
    type = type.toUpperCase();

    if (!Object.values(Types).includes(type as Types)) {
      return sendApiResponse(res, {
        message: "Invalid product type.",
        status: 400,
      });
    }

    const enumType = type as Types;
    const result = await productService.getAllBrandNameService(enumType);

    sendApiResponse(res, {
      message: "Successfully retrieved all product brand names.",
      status: 200,
      data: result,
    });
  } catch (err: any) {
    sendApiResponse(res, {
      message: "Failed to retrieve product brand names.",
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
