import dotenv from 'dotenv';
dotenv.config(); 

type IEnv = {
  port: number;
  db_url: string;
}

const envConfig: IEnv = {
  port: Number(process.env.PORT) || 5000,
  db_url: process.env.DATABASE_URL || ''
}

export default envConfig;
