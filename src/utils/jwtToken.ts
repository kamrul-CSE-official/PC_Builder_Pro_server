import jwt from "jsonwebtoken";
import envConfig from "../config/env.config";
import { PrismaClient, User as PrismaUser } from "@prisma/client";

const prisma = new PrismaClient();

const generateAccessToken = async ({
  key,
  value,
}: {
  key: "id" | "email"; // Restricting to unique fields
  value: string;
}): Promise<string> => {
  try {
    const whereClause = key === "id" ? { id: value } : { email: value };

    const user: PrismaUser | null = await prisma.user.findUnique({
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

    return jwt.sign(payload, envConfig.jwt.accessTokenSecret as string, {
      expiresIn: Number(envConfig.jwt.accessTokenExpiresIn) || "5m",
    });
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Failed to generate access token");
  }
};

const generateRefreshToken = async ({
  key,
  value,
}: {
  key: "id" | "email";
  value: string;
}): Promise<string> => {
  try {
    const whereClause = key === "id" ? { id: value } : { email: value };

    const user: PrismaUser | null = await prisma.user.findUnique({
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

    return jwt.sign(payload, envConfig.jwt.refreshTokenSecret as string, {
      expiresIn: Number(envConfig.jwt.refreshTokenExpiresIn) || "30d",
    });
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw new Error("Failed to generate refresh token");
  }
};

const verifyToken = (token: string, secret: string): any => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Invalid token");
  }
};

export { generateAccessToken, generateRefreshToken, verifyToken };
