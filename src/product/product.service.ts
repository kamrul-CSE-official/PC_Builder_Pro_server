import { PrismaClient, Product as PrismaProduct } from "@prisma/client";
import { IProduct } from "./product.types";

const prisma = new PrismaClient();

const addMultipleProductsService = async (
  datas: any[]
): Promise<{ count: number }> => {
  try {
    const result = await prisma.product.createMany({
      data: datas,
    });
    return result; // { count: number }
  } catch (error) {
    throw new Error("Failed to add products!");
  }
};

const getAllProductsService = async (): Promise<PrismaProduct[]> => {
  try {
    const result = await prisma.product.findMany();
    return result;
  } catch (error) {
    throw new Error("Failed to find products!");
  }
};

const getAllBrandNameService = async (): Promise<string[]> => {
  try {
    const products = await prisma.product.findMany({
      // @ts-ignore
      select: { brand: true },
    }); // @ts-ignore
    const uniqueBrands = [...new Set(products.map((product) => product.brand))];
    return uniqueBrands;
  } catch (error) {
    throw new Error("Failed to find brand names!");
  }
};

const productService = {
  addMultipleProductsService,
  getAllProductsService,
  getAllBrandNameService,
};

export default productService;
