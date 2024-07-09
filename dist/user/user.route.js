"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const user_controller_1 = __importDefault(require("./user.controller"));
const router = express_1.default.Router();
const routes = [
    {
        method: "GET",
        path: "/",
        controller: user_controller_1.default.allusersController,
    },
    {
        method: "GET",
        path: "/purchases/:userId",
        controller: user_controller_1.default.getProductsBoughtByUserController,
    },
    {
        method: "POST",
        path: "/register",
        controller: user_controller_1.default.registerUserController,
    },
    {
        method: "POST",
        path: "/login",
        controller: user_controller_1.default.loginUserController,
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
