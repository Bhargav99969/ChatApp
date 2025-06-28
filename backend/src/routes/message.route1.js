import express from "express"
import { ProtectRoute } from "../middleware/ProtectRoute.js";
import { sendMessage,getUserForSideBar,getMessage } from "../controller/message.controller.js";

const router1 = express.Router()

router1.get("/user",ProtectRoute,getUserForSideBar)
router1.get("/:id",ProtectRoute,getMessage)
router1.post("/send/:id",ProtectRoute,sendMessage)
 

export default router1;

