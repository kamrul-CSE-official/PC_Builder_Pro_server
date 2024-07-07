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

const buyProductCOntroller = async (req: Request, res: Response) => {
  try {
    const { buyerId, productIds } = req.body;
    if (
      !buyerId ||
      !productIds ||
      !Array.isArray(productIds) ||
      productIds.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Buyer ID and an array of Product IDs are required" });
    }

    const buy = await productService.createBuyService(buyerId, productIds);

    sendApiResponse(res, {
      message: "Buy created successfully.",
      status: 201,
      data: buy,
    });
  } catch (err: any) {
    sendApiResponse(res, {
      message: "Fail to create buy product.",
      status: 500,
    });
  }
};

const getBestSellingProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const bestSellingProducts =
      await productService.getBestSellingProductsService();
    return sendApiResponse(res, {
      message: "Successfully retrieved best-selling products",
      status: 200,
      data: bestSellingProducts,
    });
  } catch (error) {
    return sendApiResponse(res, {
      message: "Failed to retrieve best-selling products",
      status: 500,
    });
  }
};

const productController = {
  addMultipleProducts,
  getAllProductsController,
  getAllBrandNameController,
  buyProductCOntroller,
  getBestSellingProductsController,
};

export default productController;
