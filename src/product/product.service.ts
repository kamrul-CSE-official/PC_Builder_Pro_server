import { PaymentTypes, PrismaClient, Product, ProductTypes } from "@prisma/client";

const prisma = new PrismaClient();

const isEnumValue = (key: string, enumObject: any): boolean => {
  return Object.values(enumObject).includes(key.toUpperCase());
};



const addMultipleProductsService = async (datas: any[]): Promise<{ count: number }> => {
  try {
    let createdProductsCount = 0;

    // Create products one by one to avoid transaction issues
    for (const data of datas) {
      await prisma.product.create({ data });
      createdProductsCount++;
    }

    return { count: createdProductsCount };
  } catch (error) {
    throw new Error("Failed to add products!");
  }
};



const getAllProductsService = async (): Promise<Partial<Product[]>> => {
  try {
    const result = await prisma.product.findMany();
    return result;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to find products!");
  }
};

const getAllBrandNameService = async (
  type: ProductTypes
): Promise<string[]> => {
  try {
    const products = await prisma.product.findMany({
      select: { brand: true },
      where: { type },
    });

    const uniqueBrands = Array.from(
      new Set(products.map((product) => product.brand))
    );
    return uniqueBrands;
  } catch (error) {
    throw new Error("Failed to retrieve brand names!");
  }
};



const createBuyService = async (
  products: { buyerId: string; productId: string; quantities: number }[],
  paymentType: PaymentTypes,
  paymentDetails: string
): Promise<any | null> => {
  try {
    const sales = await prisma.$transaction(
      products.map(({ buyerId, productId, quantities }) =>
        prisma.sell.create({
          data: {
            buyerId,
            productId,
            quantity: quantities,
            paymentType,
            paymentDetails,
          },
        })
      )
    );
    return sales;
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new Error("Failed to create sales!");
  }
};



const getBestSellingProductsService = async () => {
  try {
    // Step 1: Get the best-selling products by grouping sales
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
      take: 10, // Limit to top N best-selling products
    });

    // Step 2: Extract product IDs from best-selling products
    const bestSellingProductIds = bestSellingProducts.map((sell) => sell.productId);

    // Step 3: Fetch product details for the best-selling product IDs
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: bestSellingProductIds,
        },
      },
    });

    // Step 4: Map the best-selling products with their respective product details
    return bestSellingProducts.map((sell) => {
      const product = products.find((p) => p.id === sell.productId);
      return {
        id: product?.id,                     
        name: product?.title,                
        price: product?.price,    
        image: product?.image,
        brand: product?.brand,
        type: product?.type,  
        stock: product?.stock,
        // reviews: product?.reviews,          
        count: sell?._count.productId,      
      };
    });
  } catch (error) {
    console.error(error); 
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

    if (isEnumValue(key, ProductTypes)) {
      searchCriteria.push({
        type: { equals: searchKeyUpperCase as ProductTypes },
      });
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
