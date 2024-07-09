"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const isEnumValue = (key, enumObject) => {
    return Object.values(enumObject).includes(key.toUpperCase());
};
const addMultipleProductsService = async (datas) => {
    try {
        const result = await prisma.product.createMany({
            data: datas,
        });
        return result;
    }
    catch (error) {
        throw new Error("Failed to add products!");
    }
};
const getAllProductsService = async () => {
    try {
        const result = await prisma.product.findMany();
        return result;
    }
    catch (error) {
        throw new Error("Failed to find products!");
    }
};
const getAllBrandNameService = async (type) => {
    try {
        const products = await prisma.product.findMany({
            select: { brand: true },
            where: { type },
        });
        const uniqueBrands = Array.from(new Set(products.map((product) => product.brand)));
        return uniqueBrands;
    }
    catch (error) {
        throw new Error("Failed to retrieve brand names!");
    }
};
const createBuyService = async (buyerId, productIds) => {
    try {
        const sales = await prisma.$transaction(productIds.map((productId) => prisma.sell.create({
            // @ts-ignore
            data: {
                buyerId,
                productId,
            },
        })));
        return sales;
    }
    catch (error) {
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
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: bestSellingProducts.map((sell) => sell.productId),
                },
            },
        });
        const result = bestSellingProducts.map((sell) => {
            const product = products.find((p) => p.id === sell.productId);
            return {
                product,
                count: sell._count.productId,
            };
        });
        return result;
    }
    catch (error) {
        throw new Error("Failed to retrieve best-selling products!");
    }
};
const getSearchProductService = async (key) => {
    try {
        const searchKeyUpperCase = key.toUpperCase();
        const searchCriteria = [
            { model: { contains: key, mode: "insensitive" } },
            { brand: { contains: key, mode: "insensitive" } },
            { title: { contains: key, mode: "insensitive" } },
            { description: { contains: key, mode: "insensitive" } },
        ];
        if (isEnumValue(key, client_1.ProductTypes)) {
            searchCriteria.push({
                type: { equals: searchKeyUpperCase },
            });
        }
        const products = await prisma.product.findMany({
            where: {
                OR: searchCriteria,
            },
        });
        return products;
    }
    catch (error) {
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
exports.default = productService;
