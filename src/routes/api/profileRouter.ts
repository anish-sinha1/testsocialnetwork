import Profile, { IProfile } from "../../models/profileModel";
import { authJWT } from "../../middleware/auth";
import express, { Router } from "express";
import {
  getUserProfile,
  createUserProfile,
} from "../../controllers/profileController";
import { check } from "express-validator";

const router = Router();

router
  .route("/")
  .post(
    authJWT,
    check("status", "status is required!").not().isEmpty(),
    check("skills", "skills is required!").not().isEmpty(),
    createUserProfile
  );

/**
 * @route GET api/profile/me
 * @description Get current user's profile
 * @access private
 */

router.route("/me").get(authJWT, getUserProfile);

export default router;
