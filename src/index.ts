import { PrismaClient } from '@prisma/client';
import envConfig from './config/env.config';
import app from './app';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully 🎁');

    // Start the server after the database is connected
    app.listen(envConfig.port, () => {
      console.log(`Server is running on port ${envConfig.port} 🏃`);
    });
  } catch (error:any) {
    console.log('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
