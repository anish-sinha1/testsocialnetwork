import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import User from "../models/userModel";
import Post, { IPost } from "../models/postModel";

export const createPost: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user.name, user.avatar, user.id);
    const newPost: IPost = new Post({
      text: req.body.text,
      author: user.name,
      avatar: user.avatar,
      user: req.user.id,
    } as IPost);
    const post = await newPost.save();
    res.status(200).json({
      post,
    });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};
