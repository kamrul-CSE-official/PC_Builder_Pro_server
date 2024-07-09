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
const env_config_1 = __importDefault(require("./config/env.config"));
const app_1 = __importDefault(require("./app"));
const prisma = new client_1.PrismaClient();
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect();
            console.log("Database connected successfully 🎁");
            app_1.default.listen(env_config_1.default.port, () => {
                console.log(`Server is running on port ${env_config_1.default.port} 🏃`);
            });
        }
        catch (error) {
            console.error("Error connecting to the database:", error);
            process.exit(1);
        }
    });
}
/*
process.on("SIGINT", async () => {
  console.log(
    "SIGINT signal received: closing HTTP server and disconnecting from database"
  );
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log(
    "SIGTERM signal received: closing HTTP server and disconnecting from database"
  );
  await prisma.$disconnect();
  process.exit(0);
});
*/
startServer();
