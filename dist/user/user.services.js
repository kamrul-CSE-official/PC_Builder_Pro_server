"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const env_config_1 = __importDefault(require("../config/env.config"));
const prisma = new client_1.PrismaClient();
const registerUserService = async (data) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(data.password, env_config_1.default.bcrypt || 10);
        const newUser = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                profilePic: data?.profilePic || "https://avatar.iran.liara.run/public",
                password: hashedPassword,
            },
        });
        return newUser;
    }
    catch (error) {
        throw new Error("Failed to register user!");
    }
};
const loginUserService = async (data) => {
    try {
        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (!user) {
            throw new Error("User not found!");
        }
        const isPasswordValid = await bcrypt_1.default.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials!");
        }
        return user;
    }
    catch (error) {
        throw new Error("Failed to login user: " + error.message);
    }
};
const allUserGetService = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    }
    catch (error) {
        throw new Error("Failed to retrieve users!");
    }
};
const getProductsBoughtByUserService = async (buyerId) => {
    try {
        const sales = await prisma.sell.findMany({
            where: { buyerId: buyerId },
            include: { product: true, buyer: true },
        });
        return sales;
    }
    catch (error) {
        throw new Error("Failed to retrieve products bought by user!");
    }
};
const userService = {
    registerUserService,
    loginUserService,
    allUserGetService,
    getProductsBoughtByUserService,
};
exports.default = userService;
