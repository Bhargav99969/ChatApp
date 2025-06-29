import jwt from "jsonwebtoken";
import user from "../models/user.model.js";

export const genrateToken = (userid, res) => {
  console.log(userid,"genratin token for userid")
  const token = jwt.sign({userid}, process.env.jwt_secret, {
    expiresIn: "10d",
  });
  res.cookie("token", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite:"None"
  });

  return token
};
