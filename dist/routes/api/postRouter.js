"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const postController_1 = require("../../controllers/postController");
const auth_1 = require("../../middleware/auth");
const router = express_1.Router();
router.route("/").post(auth_1.authJWT, express_validator_1.check("text").not().isEmpty(), postController_1.createPost);
exports.default = router;
