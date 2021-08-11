"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const express_validator_1 = require("express-validator");
const userModel_1 = __importDefault(require("../models/userModel"));
const postModel_1 = __importDefault(require("../models/postModel"));
const createPost = async (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    try {
        const user = await userModel_1.default.findById(req.user.id).select("-password");
        console.log(user.name, user.avatar, user.id);
        const newPost = new postModel_1.default({
            text: req.body.text,
            author: user.name,
            avatar: user.avatar,
            user: req.user.id,
        });
        const post = await newPost.save();
        res.status(200).json({
            post,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "server error",
        });
    }
};
exports.createPost = createPost;
