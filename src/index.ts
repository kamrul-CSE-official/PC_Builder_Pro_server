import { PrismaClient } from '@prisma/client';
import envConfig from './config/env.config';
import app from './app';

const prisma = new PrismaClient();

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully 🎁");

    app.listen(envConfig.port, () => {
      console.log(`Server is running on port ${envConfig.port} 🏃`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
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
