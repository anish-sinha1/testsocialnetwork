"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const express_validator_1 = require("express-validator");
const router = express_1.Router();
router
    .route("/")
    .get(auth_1.authJWT)
    .post(express_validator_1.check("email", "please include a valid email address").isEmail(), express_validator_1.check("password", "password is required").exists(), auth_1.authVerify);
exports.default = router;
