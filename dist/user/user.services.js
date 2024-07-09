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
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const env_config_1 = __importDefault(require("../config/env.config"));
const prisma = new client_1.PrismaClient();
const registerUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(data.password, env_config_1.default.bcrypt || 10);
        const newUser = yield prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                profilePic: (data === null || data === void 0 ? void 0 : data.profilePic) || "https://avatar.iran.liara.run/public",
                password: hashedPassword,
            },
        });
        return newUser;
    }
    catch (error) {
        throw new Error("Failed to register user!");
    }
});
const loginUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({ where: { email: data.email } });
        if (!user) {
            throw new Error("User not found!");
        }
        const isPasswordValid = yield bcrypt_1.default.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials!");
        }
        return user;
    }
    catch (error) {
        throw new Error("Failed to login user: " + error.message);
    }
});
const allUserGetService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        return users;
    }
    catch (error) {
        throw new Error("Failed to retrieve users!");
    }
});
const getProductsBoughtByUserService = (buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield prisma.sell.findMany({
            where: { buyerId: buyerId },
            include: { product: true, buyer: true },
        });
        return sales;
    }
    catch (error) {
        throw new Error("Failed to retrieve products bought by user!");
    }
});
const userService = {
    registerUserService,
    loginUserService,
    allUserGetService,
    getProductsBoughtByUserService,
};
exports.default = userService;
