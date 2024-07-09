import dotenv from 'dotenv';

dotenv.config();

type IEnv = {
  port: number;
  dbUrl: string;
  nodeEnv: string;
  bcrypt: number;
  jwt: {
    accessTokenSecret: string;
    accessTokenExpiresIn: number;
    refreshTokenSecret: string;
    refreshTokenExpiresIn: number;
  };
};

const envConfig: IEnv = {
  port: Number(process.env.PORT) || 5001,
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

export default envConfig;
