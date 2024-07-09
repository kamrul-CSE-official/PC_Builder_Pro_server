"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envConfig = {
    port: Number(process.env.PORT) || 5000,
    dbUrl: process.env.DATABASE_URL || "",
    nodeEnv: process.env.NODE_ENV || "production",
    bcrypt: Number(process.env.BCRYPT_VALUE) || 10,
    jwt: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "",
        accessTokenExpiresIn: Number(process.env.ACCESS_TOKEN_EXPIRE) || 600, // 10 minutes
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "",
        refreshTokenExpiresIn: Number(process.env.REFRESH_TOKEN_EXPIRE) || 2592000, // 30 days
    },
};
exports.default = envConfig;
