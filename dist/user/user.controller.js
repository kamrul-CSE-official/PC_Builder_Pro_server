"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const user_services_1 = __importDefault(require("./user.services"));
const apiResponse_1 = require("../utils/apiResponse");
const env_config_1 = __importDefault(require("../config/env.config"));
const jwtToken_1 = require("../utils/jwtToken");
const prisma = new client_1.PrismaClient();
const registerUserController = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: req.body.email },
        });
        if (user) {
            return (0, apiResponse_1.sendApiResponse)(res, {
                message: "User already exist.",
                status: 404,
            });
        }
        const result = await user_services_1.default.registerUserService(req.body);
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Successfully registered user.",
            status: 200,
            data: result,
        });
    }
    catch (err) {
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Failed to register user.",
            status: 500,
        });
    }
};
const loginUserController = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: req.body.email },
        });
        if (!user) {
            return (0, apiResponse_1.sendApiResponse)(res, {
                message: "User not found. Please register first.",
                status: 404,
            });
        }
        const isPasswordValid = await user_services_1.default.loginUserService(req.body);
        if (!isPasswordValid) {
            return (0, apiResponse_1.sendApiResponse)(res, {
                message: "Invalid credentials.",
                status: 401,
            });
        }
        // Generate access token
        const accessToken = await (0, jwtToken_1.generateAccessToken)({
            key: "email",
            value: req.body.email,
        });
        // Generate refresh token
        const refreshToken = await (0, jwtToken_1.generateRefreshToken)({
            key: "email",
            value: req.body.email,
        });
        // Set refresh token as a cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env_config_1.default.nodeEnv === "production",
            sameSite: "strict",
            domain: "localhost",
        });
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Successfully logged in.",
            status: 200,
            data: { accessToken, refreshToken },
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Failed to login user.",
            status: 500,
        });
    }
};
const allusersController = async (req, res) => {
    try {
        const result = await user_services_1.default.allUserGetService();
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Successfully retrieved all users.",
            status: 200,
            data: result,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            message: "Failed to retrieve users.",
            status: 500,
        });
    }
};
const getProductsBoughtByUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return (0, apiResponse_1.sendApiResponse)(res, {
                message: "Buyer ID is required",
                status: 400,
            });
        }
        const sales = await user_services_1.default.getProductsBoughtByUserService(userId);
        return (0, apiResponse_1.sendApiResponse)(res, {
            message: "Successfully retrieved products bought by user",
            status: 200,
            data: sales,
        });
    }
    catch (error) {
        return (0, apiResponse_1.sendApiResponse)(res, {
            message: "Failed to retrieve products bought by user",
            status: 500,
        });
    }
};
const userController = {
    registerUserController,
    loginUserController,
    allusersController,
    getProductsBoughtByUserController,
};
exports.default = userController;
