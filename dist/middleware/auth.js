"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authVerify = exports.authJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const authJWT = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(403).json({
            msg: "Invalid or expired token",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        res.status(200).json({
            user: req.user,
        });
    }
    catch (_a) {
        res.status(403).json({
            msg: "Invalid or expired token!",
        });
    }
};
exports.authJWT = authJWT;
const authVerify = async (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { email, password } = req.body;
    try {
        let user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Invalid credentials!",
                    },
                ],
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Invalid credentials!",
                    },
                ],
            });
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600000,
        }, (err, token) => {
            if (err)
                throw err;
            return res.status(200).json({
                token,
            });
        });
    }
    catch (err) {
        res.status(500).json({
            status: "failed",
            data: {
                errors: err.message,
            },
        });
    }
};
exports.authVerify = authVerify;
