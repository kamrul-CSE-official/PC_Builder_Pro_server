"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const notFoundHandler_1 = __importDefault(require("./utils/notFoundHandler"));
const user_route_1 = __importDefault(require("./user/user.route"));
const product_route_1 = __importDefault(require("./product/product.route"));
const app = (0, express_1.default)();
// Define allowed origins
const allowedOrigins = ["http://localhost:3000"];
// CORS options
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
// Middleware setup
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Root route handler
app.get("/", (req, res) => {
    res.send("PC-Builder-Pro server is running...🏃");
});
// API routes
app.use("/api/v1/users", user_route_1.default);
app.use("/api/v1/products", product_route_1.default);
// Global error handling middleware
app.use(notFoundHandler_1.default);
app.use(errorHandler_1.default);
exports.default = app;
