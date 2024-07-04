"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler_1 = require("./responseHandler");
const notFoundHandler = (req, res, next) => {
    (0, responseHandler_1.handleError)(res, new Error("Not Found"), 404, "API endpoint not found");
};
exports.default = notFoundHandler;
