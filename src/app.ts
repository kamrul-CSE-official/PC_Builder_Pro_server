import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorHandler";
import notFoundHandler from "./utils/notFoundHandler";

import userRoutes from "./user/user.route";
import productRoutes from "./product/product.route";

const app: Application = express();

// Define allowed origins
const allowedOrigins = ["http://localhost:3000"];

// CORS options
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Root route handler
app.get("/", (req, res) => {
  res.send("PC-Builder-Pro server is running...🏃");
});

// API routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);

// Global error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
