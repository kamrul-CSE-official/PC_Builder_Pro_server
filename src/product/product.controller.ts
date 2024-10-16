import { Request, Response } from "express";
import { ProductTypes } from "@prisma/client";
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
    console.log(err.message);
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

    if (!Object.values(ProductTypes).includes(type as ProductTypes)) {
      return sendApiResponse(res, {
        message: "Invalid product type.",
        status: 400,
      });
    }

    const enumType = type as ProductTypes;
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



const buyProductController = async (req: Request, res: Response) => {
  try {
    const { products, paymentType, paymentDetails } = req.body;

    // Validate the incoming data
    if (
      !products ||
      !Array.isArray(products) ||
      products.length === 0 ||
      !paymentType || 
      !paymentDetails 
    ) {
      return res.status(400).json({
        message: "Products array, payment type, and payment details are required.",
      });
    }

    const buy = await productService.createBuyService(products, paymentType, paymentDetails);

    sendApiResponse(res, {
      message: "Buy created successfully.",
      status: 201,
      data: buy,
    });
  } catch (err: any) {
    console.error(err); 
    sendApiResponse(res, {
      message: "Failed to create buy product.",
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

const getSearchProductController = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;

    if (!key) {
      return sendApiResponse(res, {
        message: "Write something and then search again!",
        status: 400,
      });
    }

    const result = await productService.getSearchProductService(key);

    sendApiResponse(res, {
      message: "Successfully retrieved products.",
      status: 200,
      data: result,
    });
  } catch (err: any) {
    sendApiResponse(res, {
      message: "Failed to retrieve products.",
      status: 500,
    });
  }
};

const productController = {
  addMultipleProducts,
  getAllProductsController,
  getAllBrandNameController,
  buyProductController,
  getBestSellingProductsController,
  getSearchProductController,
};

export default productController;
