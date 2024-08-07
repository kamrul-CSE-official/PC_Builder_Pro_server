"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../config/env.config"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const generateAccessToken = async ({ key, value, }) => {
    try {
        const whereClause = key === "id" ? { id: value } : { email: value };
        const user = await prisma.user.findUnique({
            where: whereClause,
        });
        if (!user) {
            throw new Error("User not found");
        }
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
        return jsonwebtoken_1.default.sign(payload, env_config_1.default.jwt.accessTokenSecret, {
            expiresIn: Number(env_config_1.default.jwt.accessTokenExpiresIn) || "5m",
        });
    }
    catch (error) {
        console.error("Error generating access token:", error);
        throw new Error("Failed to generate access token");
    }
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = async ({ key, value, }) => {
    try {
        const whereClause = key === "id" ? { id: value } : { email: value };
        const user = await prisma.user.findUnique({
            where: whereClause,
        });
        if (!user) {
            throw new Error("User not found");
        }
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
        return jsonwebtoken_1.default.sign(payload, env_config_1.default.jwt.refreshTokenSecret, {
            expiresIn: Number(env_config_1.default.jwt.refreshTokenExpiresIn) || "30d",
        });
    }
    catch (error) {
        console.error("Error generating refresh token:", error);
        throw new Error("Failed to generate refresh token");
    }
};
exports.generateRefreshToken = generateRefreshToken;
const verifyToken = (token, secret) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        console.error("Error verifying token:", error);
        throw new Error("Invalid token");
    }
};
exports.verifyToken = verifyToken;
