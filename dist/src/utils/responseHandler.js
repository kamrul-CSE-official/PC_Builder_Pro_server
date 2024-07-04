"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.handleError = exports.handleSuccess = void 0;
const handleSuccess = (res, data, message = "Success") => {
    res.status(200).json({
        status: "success",
        message,
        data,
    });
};
exports.handleSuccess = handleSuccess;
const handleError = (res, error, statusCode = 500, message = "An error occurred") => {
    if (error) {
        const validationErrors = error.errors.map((err) => err.message);
        res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: validationErrors[0],
        });
    }
    else {
        res.status(statusCode).json({
            status: "error",
            message,
            error: error.message || error,
        });
    }
};
exports.handleError = handleError;
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncHandler = asyncHandler;
