import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

export const genrateToken = (userid, res) => {
  console.log(userid,"genratin token for userid")
  const token = jwt.sign({userid}, process.env.jwt_secret, {
    expiresIn: "10d",
  });
  res.cookie("token", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    sameSite:"None",
    secure:process.env.NODE_ENV !=="development"
  });

  return token
};
