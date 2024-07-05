import dotenv from 'dotenv';
dotenv.config(); 

type IEnv = {
  port: number;
  db_url: string;
  jwt: {
    accessTokenSecret: string;
    accessTokenExpiresIn: number;
    refreshTokenSecret: string;
    refreshTokenExpiresIn: number;
  };
};

const envConfig: IEnv = {
  port: Number(process.env.PORT) || 5000,
  db_url: process.env.DATABASE_URL || "",
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "",
    accessTokenExpiresIn:
      Number(process.env.ACCESSTOKENEXPIRE) || 1000 * 60 * 5,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "",
    refreshTokenExpiresIn:
      Number(process.env.DATABASE_URL) || 1000 * 60 * 60 * 24,
  },
};

export default envConfig;
