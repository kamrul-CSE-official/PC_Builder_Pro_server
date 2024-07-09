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
const user_services_1 = __importDefault(require("./user.services"));
const apiResponse_1 = require("../utils/apiResponse");
const jwtToken_1 = require("../utils/jwtToken");
const env_config_1 = __importDefault(require("../config/env.config"));
const prisma = new client_1.PrismaClient();
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { email: req.body.email },
        });
        if (user) {
            return (0, apiResponse_1.sendApiResponse)(res, {
                message: "User already exist.",
                status: 404,
            });
        }
        const result = yield user_services_1.default.registerUserService(req.body);
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
});
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { email: req.body.email },
        });
        if (!user) {
            return (0, apiResponse_1.sendApiResponse)(res, {
                message: "User not found. Please register first.",
                status: 404,
            });
        }
        const isPasswordValid = yield user_services_1.default.loginUserService(req.body);
        if (!isPasswordValid) {
            return (0, apiResponse_1.sendApiResponse)(res, {
                message: "Invalid credentials.",
                status: 401,
            });
        }
        // Generate access token
        const accessToken = yield (0, jwtToken_1.generateAccessToken)({
            key: "email",
            value: req.body.email,
        });
        // Generate refresh token
        const refreshToken = yield (0, jwtToken_1.generateRefreshToken)({
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
});
const allusersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.default.allUserGetService();
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
});
const getProductsBoughtByUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return (0, apiResponse_1.sendApiResponse)(res, {
                message: "Buyer ID is required",
                status: 400,
            });
        }
        const sales = yield user_services_1.default.getProductsBoughtByUserService(userId);
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
});
const userController = {
    registerUserController,
    loginUserController,
    allusersController,
    getProductsBoughtByUserController,
};
exports.default = userController;
