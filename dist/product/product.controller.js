"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const apiResponse_1 = require("../utils/apiResponse");
const product_service_1 = __importDefault(require("./product.service"));
const addMultipleProducts = async (req, res) => {
    try {
        const result = await product_service_1.default.addMultipleProductsService(req.body);
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Successfully added products.",
            status: 200,
            data: result,
        });
    }
    catch (err) {
        console.log(err.message);
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Failed to add products.",
            status: 500,
        });
    }
};
const getAllProductsController = async (req, res) => {
    try {
        const result = await product_service_1.default.getAllProductsService();
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Successfully get all products.",
            status: 200,
            data: result,
        });
    }
    catch (err) {
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Failed to get products.",
            status: 500,
        });
    }
};
const getAllBrandNameController = async (req, res) => {
    try {
        let { type } = req.params;
        type = type.toUpperCase();
        if (!Object.values(client_1.ProductTypes).includes(type)) {
            return (0, apiResponse_1.sendApiResponse)(res, {
                message: "Invalid product type.",
                status: 400,
            });
        }
        const enumType = type;
        const result = await product_service_1.default.getAllBrandNameService(enumType);
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Successfully retrieved all product brand names.",
            status: 200,
            data: result,
        });
    }
    catch (err) {
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Failed to retrieve product brand names.",
            status: 500,
        });
    }
};
const buyProductController = async (req, res) => {
    try {
        const { products, paymentType, paymentDetails } = req.body;
        // Validate the incoming data
        if (!products ||
            !Array.isArray(products) ||
            products.length === 0 ||
            !paymentType ||
            !paymentDetails) {
            return res.status(400).json({
                message: "Products array, payment type, and payment details are required.",
            });
        }
        const buy = await product_service_1.default.createBuyService(products, paymentType, paymentDetails);
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Buy created successfully.",
            status: 201,
            data: buy,
        });
    }
    catch (err) {
        console.error(err);
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Failed to create buy product.",
            status: 500,
        });
    }
};
const getBestSellingProductsController = async (req, res) => {
    try {
        const bestSellingProducts = await product_service_1.default.getBestSellingProductsService();
        return (0, apiResponse_1.sendApiResponse)(res, {
            message: "Successfully retrieved best-selling products",
            status: 200,
            data: bestSellingProducts,
        });
    }
    catch (error) {
        return (0, apiResponse_1.sendApiResponse)(res, {
            message: "Failed to retrieve best-selling products",
            status: 500,
        });
    }
};
const getSearchProductController = async (req, res) => {
    try {
        const { key } = req.params;
        if (!key) {
            return (0, apiResponse_1.sendApiResponse)(res, {
                message: "Write something and then search again!",
                status: 400,
            });
        }
        const result = await product_service_1.default.getSearchProductService(key);
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Successfully retrieved products.",
            status: 200,
            data: result,
        });
    }
    catch (err) {
        (0, apiResponse_1.sendApiResponse)(res, {
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
exports.default = productController;
