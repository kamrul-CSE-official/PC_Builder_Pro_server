"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const isEnumValue = (key, enumObject) => {
    return Object.values(enumObject).includes(key.toUpperCase());
};
const addMultipleProductsService = (datas) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.product.createMany({
            data: datas,
        });
        return result;
    }
    catch (error) {
        throw new Error("Failed to add products!");
    }
});
const getAllProductsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.product.findMany();
        return result;
    }
    catch (error) {
        throw new Error("Failed to find products!");
    }
});
const getAllBrandNameService = (type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany({
            select: { brand: true },
            where: { type },
        });
        const uniqueBrands = Array.from(new Set(products.map((product) => product.brand)));
        return uniqueBrands;
    }
    catch (error) {
        throw new Error("Failed to retrieve brand names!");
    }
});
const createBuyService = (buyerId, productIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield prisma.$transaction(productIds.map((productId) => prisma.sell.create({
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
});
const getBestSellingProductsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bestSellingProducts = yield prisma.sell.groupBy({
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
        const products = yield prisma.product.findMany({
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
});
const getSearchProductService = (key) => __awaiter(void 0, void 0, void 0, function* () {
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
        const products = yield prisma.product.findMany({
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
});
const productService = {
    addMultipleProductsService,
    getAllProductsService,
    getAllBrandNameService,
    createBuyService,
    getBestSellingProductsService,
    getSearchProductService,
};
exports.default = productService;
