import express, { Router } from "express";
import { authJWT, authVerify } from "../../middleware/auth";
import User from "../../models/userModel";
import { check } from "express-validator";

const router = Router();

router
  .route("/")
  .get(authJWT)
  .post(
    check("email", "please include a valid email address").isEmail(),
    check("password", "password is required").exists(),
    authVerify
  );

export default router;
