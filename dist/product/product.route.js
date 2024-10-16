"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const product_controller_1 = __importDefault(require("./product.controller"));
const router = express_1.default.Router();
const routes = [
    {
        method: "GET",
        path: "/",
        controller: product_controller_1.default.getAllProductsController,
    },
    {
        method: "GET",
        path: "/best-sell",
        controller: product_controller_1.default.getBestSellingProductsController,
    },
    {
        method: "GET",
        path: "/search/:key",
        controller: product_controller_1.default.getSearchProductController,
    },
    {
        method: "GET",
        path: "/brand-name/:type",
        controller: product_controller_1.default.getAllBrandNameController,
    },
    {
        method: "POST",
        path: "/add-products",
        controller: product_controller_1.default.addMultipleProducts,
    },
    {
        method: "POST",
        path: "/buy",
        controller: product_controller_1.default.buyProductController,
    },
];
routes.forEach(({ method, path, controller }) => {
    switch (method) {
        case "GET":
            router.get(path, (0, asyncHandler_1.default)(controller));
            break;
        case "POST":
            router.post(path, (0, asyncHandler_1.default)(controller));
            break;
        default:
            console.error(`Unsupported HTTP method: ${method}`);
    }
});
exports.default = router;
