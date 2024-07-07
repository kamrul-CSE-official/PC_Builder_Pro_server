import bcrypt from 'bcrypt';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { IUser } from './user.types';
import envConfig from "../config/env.config";

const prisma = new PrismaClient();

const registerUserService = async (data: IUser): Promise<PrismaUser> => {
  try {
    const hashedPassword = await bcrypt.hash(
      data.password,
      envConfig.bcrypt || 10
    );
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        profilePic: data?.profilePic || "https://avatar.iran.liara.run/public",
        password: hashedPassword,
      },
    });
    return newUser;
  } catch (error) {
    throw new Error("Failed to register user!");
  }
};

const loginUserService = async (data: {
  email: string;
  password: string;
}): Promise<PrismaUser | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new Error("User not found!");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials!");
    }

    return user;
  } catch (error: any) {
    throw new Error("Failed to login user: " + error.message);
  }
};

const allUserGetService = async (): Promise<PrismaUser[]> => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve users!");
  }
};

const userService = {
  registerUserService,
  loginUserService,
  allUserGetService,
};

export default userService;
