import express, { Router } from "express";
import { check } from "express-validator";
import { createPost } from "../../controllers/postController";
import { authJWT } from "../../middleware/auth";
const router = Router();

router.route("/").post(authJWT, check("text").not().isEmpty(), createPost);

export default router;
