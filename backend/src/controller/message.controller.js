import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import Message from "../models/message.model.js";
import user from "../models/user.model.js";
import { getReiverSocketId,io } from "../config/socket.js";


export const getUserForSideBar = async (req, res) => {
  try {
    console.log(req.user);
    const loggedInuser = req.user._id;

    console.log("1");
    const filteredUser = await user
      .find({ _id: { $ne: loggedInuser } })
      .select("-password");
    console.log(filteredUser);
    res.status(200).json({ filteredUser });
  } catch (e) {
    res.status(500);
  }
};

export const getMessage = async (req, res) => {
  try {
    const myId = req.user._id.toString();
    const usertToChat = req.params.id;

    console.log("myId:", myId);
    console.log("usertToChat:", usertToChat);

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          recieverId: usertToChat,
        },
        {
          senderId: usertToChat,
          recieverId: myId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("getMessage error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let imageurl;
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      imageurl = uploadImage.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image: imageurl || null,
    });

    await newMessage.save();

    const recieverSocketId = getReiverSocketId(recieverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("x", newMessage);
    }
    console.log(newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
