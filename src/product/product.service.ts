import { PrismaClient, Product as PrismaProduct, Types } from "@prisma/client";
import { IProduct, ITypes } from "./product.types";

const prisma = new PrismaClient();

const isEnumValue = (key: string, enumObject: any): boolean => {
  return Object.values(enumObject).includes(key.toUpperCase());
};

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

const getAllBrandNameService = async (type: Types): Promise<string[]> => {
  try {
    const products = await prisma.product.findMany({
      select: { brand: true },
      where: { type: type },
    });

    const uniqueBrands = Array.from(
      new Set(products.map((product) => product.brand))
    );
    return uniqueBrands;
  } catch (error) {
    throw new Error("Failed to retrieve brand names!");
  }
};

const createBuyService = async (buyerId: string, productIds: string[]) => {
  try {
    const sales = await prisma.$transaction(
      productIds.map((productId) =>
        prisma.sell.create({
          data: {
            buyerId: buyerId,
            productId: productId,
          },
        })
      )
    );
    return sales;
  } catch (error) {
    throw new Error("Failed to create sales!");
  }
};

const getBestSellingProductsService = async () => {
  try {
    const bestSellingProducts = await prisma.sell.groupBy({
      by: ["productId"],
      _count: {
        productId: true,
      },
      orderBy: {
        _count: {
          productId: "desc",
        },
      },
      take: 10, // Adjust the number to get top N best-selling products
    });

    // Fetch product details for the best-selling products
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: bestSellingProducts.map((sell) => sell.productId),
        },
      },
    });

    // Combine the count data with product details
    const result = bestSellingProducts.map((sell) => {
      const product = products.find((p) => p.id === sell.productId);
      return {
        product,
        count: sell._count.productId,
      };
    });

    return result;
  } catch (error) {
    throw new Error("Failed to retrieve best-selling products!");
  }
};

const getSearchProductService = async (key: string) => {
  try {
    const searchKeyUpperCase = key.toUpperCase();

    const searchCriteria: any[] = [
      { model: { contains: key, mode: "insensitive" } },
      { brand: { contains: key, mode: "insensitive" } },
      { title: { contains: key, mode: "insensitive" } },
      { description: { contains: key, mode: "insensitive" } },
    ];

    // Add type condition only if the search key is a valid enum value
    if (isEnumValue(key, Types)) {
      searchCriteria.push({ type: { equals: searchKeyUpperCase as Types } });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: searchCriteria,
      },
    });

    return products;
  } catch (error) {
    console.error("Error retrieving products:", error);
    throw new Error("Failed to retrieve search products!");
  }
};

const productService = {
  addMultipleProductsService,
  getAllProductsService,
  getAllBrandNameService,
  createBuyService,
  getBestSellingProductsService,
  getSearchProductService,
};

export default productService;
