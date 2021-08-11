"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../middleware/auth");
const express_1 = require("express");
const profileController_1 = require("../../controllers/profileController");
const express_validator_1 = require("express-validator");
const router = express_1.Router();
router
    .route("/")
    .post(auth_1.authJWT, express_validator_1.check("status", "status is required!").not().isEmpty(), express_validator_1.check("skills", "skills is required!").not().isEmpty(), profileController_1.createUserProfile);
/**
 * @route GET api/profile/me
 * @description Get current user's profile
 * @access private
 */
router.route("/me").get(auth_1.authJWT, profileController_1.getUserProfile);
exports.default = router;