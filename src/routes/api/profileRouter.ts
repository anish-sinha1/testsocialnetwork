import Profile, { IProfile } from "../../models/profileModel";
import { authJWT } from "../../middleware/auth";
import express, { Router } from "express";
import {
  getUserProfile,
  createUserProfile,
  getAllProfiles,
  getProfileById,
  deleteProfile,
} from "../../controllers/profileController";
import { check } from "express-validator";

const router = Router();

router
  .route("/")
  .get(getAllProfiles)
  .post(
    authJWT,
    check("status", "status is required!").not().isEmpty(),
    check("skills", "skills is required!").not().isEmpty(),
    createUserProfile
  )
  .delete(authJWT, deleteProfile);

/**
 * @route GET api/profile/me
 * @description Get current user's profile
 * @access private
 */

router.route("/me").get(authJWT, getUserProfile);

router.route("/users/:userId").get(getProfileById);

export default router;
