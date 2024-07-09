"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendApiResponse = void 0;
const sendApiResponse = (res, apiResponse) => {
    res.status(apiResponse.status).json(apiResponse);
};
exports.sendApiResponse = sendApiResponse;
