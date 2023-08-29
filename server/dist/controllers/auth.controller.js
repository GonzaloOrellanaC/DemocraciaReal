"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const env_1 = require("../configs/env");
const auth_service_1 = (0, tslib_1.__importDefault)(require("../services/auth.service"));
const signUp = async (req, res, next) => {
    try {
        const userData = req.body;
        const userLocale = req.cookies.language || env_1.locale;
        const { cookie, createdUser } = await auth_service_1.default.signup(userData, userLocale);
        res.setHeader('Set-Cookie', [cookie]);
        res.status(201).json({ data: createdUser, message: 'signup' });
    }
    catch (error) {
        next(error);
    }
};
const logIn = async (req, res, next) => {
    try {
        const userData = req.body;
        const userLocale = req.cookies.language || env_1.locale;
        const { cookie, findUser, token } = await auth_service_1.default.login(userData, userLocale);
        res.setHeader('Set-Cookie', [cookie]);
        res.status(200).json({ data: findUser, token: token.token, message: 'login' });
    }
    catch (error) {
        next(error);
    }
};
const logOut = async (req, res, next) => {
    try {
        const userData = req.body;
        console.log(userData);
        const userLocale = req.cookies.language || env_1.locale;
        const logOutUserData = await auth_service_1.default.logout(userData, userLocale);
        res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
        res.status(200).json({ data: logOutUserData, message: 'logout' });
    }
    catch (error) {
        next(error);
    }
};
const verifyUserEmail = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.body) === null || _a === void 0 ? void 0 : _a.token.toString();
        const userId = auth_service_1.default.verifyToken(token, true)._id;
        const userLocale = req.cookies.language || env_1.locale;
        const verifyUserData = await auth_service_1.default.verifyUserEmail(userId, userLocale);
        res.status(200).json({ data: verifyUserData, message: 'verified' });
    }
    catch (error) {
        next(error);
    }
};
const forgotPassword = async (req, res, next) => {
    var _a, _b;
    try {
        const email = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.toString();
        const userLocale = req.cookies.language || env_1.locale;
        const resetUserPassword = await auth_service_1.default.forgotPassword(email, userLocale);
        res.status(200).json({ data: resetUserPassword, message: 'email sent' });
    }
    catch (error) {
        next(error);
    }
};
const resetPassword = async (req, res, next) => {
    var _a, _b, _c;
    try {
        const token = (_a = req.body) === null || _a === void 0 ? void 0 : _a.token.toString();
        const password = (_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password) === null || _c === void 0 ? void 0 : _c.toString();
        const userLocale = req.cookies.language || env_1.locale;
        console.log(token, password, userLocale);
        const resetUserPassword = await auth_service_1.default.resetPassword(token, password, userLocale);
        res.status(200).json({ data: resetUserPassword, message: 'password reset' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    signUp,
    logIn,
    logOut,
    verifyUserEmail,
    forgotPassword,
    resetPassword
};
//# sourceMappingURL=auth.controller.js.map