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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_services_1 = __importDefault(require("./user.services"));
const apiResponse_1 = require("../utils/apiResponse");
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.default.registerUserService(req.body);
        (0, apiResponse_1.sendApiResponse)(res, {
            message: 'Successfully registered user.',
            status: 200,
            data: result,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            message: 'Failed to register user.',
            status: 500,
        });
    }
});
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("login.......");
});
const allusersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.default.allUserGetService();
        (0, apiResponse_1.sendApiResponse)(res, {
            message: 'Successfully get all users.',
            status: 200,
            data: result,
        });
    }
    catch (error) {
        (0, apiResponse_1.sendApiResponse)(res, {
            message: 'Failed to get user.',
            status: 500,
        });
    }
});
const userController = {
    registerUserController,
    loginUserController,
    allusersController
};
exports.default = userController;
