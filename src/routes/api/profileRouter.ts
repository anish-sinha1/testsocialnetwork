import Profile, { IProfile } from "../../models/profileModel";
import { authJWT } from "../../middleware/auth";
import express, { Router } from "express";
import {
  getUserProfile,
  createUserProfile,
  getAllProfiles,
  getProfileById,
  deleteProfile,
  profileExperience,
  deleteExperience,
  profileEducation,
  deleteEducation,
  getGithubProfile,
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
router
  .route("/experience")
  .put(
    authJWT,
    check("title", "title is required").not().isEmpty(),
    check("company", "company is required").not().isEmpty(),
    check("from", "start date is required").not().isEmpty(),
    profileExperience
  );

router.route("/experience/:experienceId").delete(authJWT, deleteExperience);

router
  .route("/education")
  .put(
    authJWT,
    check("school", "school is required").not().isEmpty(),
    check("degree", "degree is required").not().isEmpty(),
    check("from", "start date is required").not().isEmpty(),
    profileEducation
  );

router.route("/education/:educationId").delete(authJWT, deleteEducation);
router.route("/github/:username").get(getGithubProfile);

export default router;
