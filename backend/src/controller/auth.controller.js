import { genrateToken } from "../config/jwt.js";
import user from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { name, email, password, confirm } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 charachter" });
    }
    if (password != confirm) {
      return res.status(400).json({ message: "Paswword didnt match" });
    }
    const user1 = await user.findOne({ email });
    if (user1 != null) {
      return res.status(400).json({ message: "user is alresady there" });
    }
    ///////////////////////////hashingpasss//////////////////////////////////
    const salt = await bcrypt.genSalt(10);
    const hashespass = await bcrypt.hash(password, salt);

    const newuser = await new user({
      name,
      email,
      password:hashespass,
    });
    if (newuser) {
      genrateToken(newuser._id, res);
      await newuser
        .save()
        .then(() => res.status(200).json({ message: "user is created " }));
    }
  } catch (e) {
    console.log(e);
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const olduser = await user.findOne({ email });

    if (!olduser) {
      return res.status(400).json({ message: "IL" });
    }

    const pass = await bcrypt.compare(password, olduser.password);
    if (!pass) {
      return res.status(400).json({ message: "INVALL" });
    }

    genrateToken(olduser._id, res);

    res.status(200).json({
      _id: olduser._id,
      name: olduser.name,
      email: olduser.email,
      Profilepic: olduser.Profilepic,
      message: "Logout route",
    });
  } catch (e) {
    res.status(500);
    console.log(e);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout succesfully" });
  } catch (e) {
    res.status(400).json({ message: "Logout unsuccesfull" });
    console.log(e);
  }
};


export const checkauth = (req, res) => {
  try {
    
    res.status(200).json(req.user);
  } catch (e) {
    res.status(400).json({ message: "Not Authenticated" });
    console.log(e);
  }
};
