import express from "express"
import {signup,login,logout,checkauth} from "../controller/auth.controller.js"
import { ProtectRoute } from "../middleware/ProtectRoute.js"
import { updateprofile } from "../controller/updateprofile.js"
const  router = express.Router()
 
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/update-Profile",ProtectRoute,updateprofile)
router.get("/check",ProtectRoute,checkauth);

export default router;

