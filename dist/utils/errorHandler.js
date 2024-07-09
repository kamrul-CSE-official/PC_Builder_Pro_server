"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler_1 = require("./responseHandler");
const errorHandler = (err, req, res, next) => {
    const statusCode = err?.statusCode || 500;
    const message = err?.message || "An unexpected error occurred";
    (0, responseHandler_1.handleError)(res, err, statusCode, message);
};
exports.default = errorHandler;
