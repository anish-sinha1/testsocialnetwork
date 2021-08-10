import jwt from "jsonwebtoken";
import { RequestHandler, Request } from "express";
import User, { IUser } from "../models/userModel";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import gravatar from "gravatar";

interface IToken {
  user: IUser;
}

declare module "express-serve-static-core" {
  interface Request {
    user: IUser;
  }
}

export const authJWT: RequestHandler = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(403).json({
      msg: "Invalid or expired token",
    });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IToken;

    req.user = decoded.user;

    res.status(200).json({
      user: req.user,
    });
  } catch {
    res.status(403).json({
      msg: "Invalid or expired token!",
    });
  }
};

export const authVerify: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid credentials!",
          },
        ],
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid credentials!",
          },
        ],
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          token,
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: {
        errors: err.message,
      },
    });
  }
};
