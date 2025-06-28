import cloudinary from "../config/cloudinary.js";
import user from "../models/user.model.js"

export const updateprofile = async () => {
  try {
    const { profilPic } = req.body;
    const userId = req.user._id;

    if 
    (!profilPic) 
    {
      return res.status(201).json({ message: "ERROR in getting ProfilePic" });
    }

    const uploadREs = await cloudinary.uploader.upload(profilPic);
    const updateduser = await user.findByIdAndUpdate(
      userId,
      { profilePic: uploadREs.secure_url },
      { new: true }
    );

    res.status(200).json(updateduser);
  } catch (e) {
    console.log(e, "error in updating this");
  }
};
