import { PrismaClient } from "@prisma/client";
import envConfig from "./config/env.config";
import app from "./app";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Database connected successfully 🎁");

    app.listen(Number(envConfig.port), () => {
      console.log(`Server is running on port ${envConfig.port} 🏃`);
    });
  } catch (error: any) {
    console.log("Error connecting to the database:", error);
  }
}

main();
