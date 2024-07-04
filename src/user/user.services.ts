import bcrypt from 'bcrypt';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { IUser } from './user.types';

const prisma = new PrismaClient();

const registerUserService = async (data: IUser): Promise<PrismaUser> => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        profilePic: data.profilePic,
        password: hashedPassword,  
      },
    });
    return newUser;
  } catch (error) {
    throw new Error("Failed to register user!");
  }
}

const allUserGetService = async (): Promise<PrismaUser[]> => { // Return an array of users
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve users!");
  }
}

const userService = {
  registerUserService,
  allUserGetService,  
};

export default userService;
