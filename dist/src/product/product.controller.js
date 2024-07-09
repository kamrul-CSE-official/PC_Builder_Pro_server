"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const apiResponse_1 = require("../utils/apiResponse");
const product_service_1 = __importDefault(require("./product.service"));
const addMultipleProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.default.addMultipleProductsService(req.body);
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Successfully added products.",
            status: 200,
            data: result,
        });
    }
    catch (err) {
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Failed to add products.",
            status: 500,
        });
    }
});
const getAllProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.default.getAllProductsService();
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
});
const getAllBrandNameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield product_service_1.default.getAllBrandNameService(enumType);
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
});
const buyProductCOntroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { buyerId, productIds } = req.body;
        if (!buyerId ||
            !productIds ||
            !Array.isArray(productIds) ||
            productIds.length === 0) {
            return res
                .status(400)
                .json({ message: "Buyer ID and an array of Product IDs are required" });
        }
        const buy = yield product_service_1.default.createBuyService(buyerId, productIds);
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Buy created successfully.",
            status: 201,
            data: buy,
        });
    }
    catch (err) {
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Fail to create buy product.",
            status: 500,
        });
    }
});
const getBestSellingProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bestSellingProducts = yield product_service_1.default.getBestSellingProductsService();
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
});
const getSearchProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        if (!key) {
            return (0, apiResponse_1.sendApiResponse)(res, {
                message: "Write something and then search again!",
                status: 400,
            });
        }
        const result = yield product_service_1.default.getSearchProductService(key);
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
});
const productController = {
    addMultipleProducts,
    getAllProductsController,
    getAllBrandNameController,
    buyProductCOntroller,
    getBestSellingProductsController,
    getSearchProductController,
};
exports.default = productController;
