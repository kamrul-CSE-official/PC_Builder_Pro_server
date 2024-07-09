"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const env_config_1 = __importDefault(require("./config/env.config"));
const app_1 = __importDefault(require("./app"));
const prisma = new client_1.PrismaClient();
async function main() {
    try {
        console.log("Database connected successfully 🎁");
        app_1.default.listen(Number(env_config_1.default.port), () => {
            console.log(`Server is running on port http://localhost:${env_config_1.default.port} 🏃`);
        });
    }
    catch (error) {
        console.log("Error connecting to the database:", error);
    }
}
main();
