"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../middleware/auth");
const express_1 = require("express");
const profileController_1 = require("../../controllers/profileController");
const express_validator_1 = require("express-validator");
const router = express_1.Router();
router
    .route("/")
    .get(profileController_1.getAllProfiles)
    .post(auth_1.authJWT, express_validator_1.check("status", "status is required!").not().isEmpty(), express_validator_1.check("skills", "skills is required!").not().isEmpty(), profileController_1.createUserProfile)
    .delete(auth_1.authJWT, profileController_1.deleteProfile);
/**
 * @route GET api/profile/me
 * @description Get current user's profile
 * @access private
 */
router.route("/me").get(auth_1.authJWT, profileController_1.getUserProfile);
router.route("/users/:userId").get(profileController_1.getProfileById);
exports.default = router;
