import jwt from "jsonwebtoken"
import user from "../models/user.model.js";
import { genrateToken } from "../config/jwt.js";



export const ProtectRoute=async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(201).json({message:"NO Tokens"})
        }
        console.log(process.env.jwt_secret)
        const decode =  jwt.verify(token,process.env.jwt_secret)
        console.log(decode)
        if(!decode){
            return res.status(201).json({message:"Not allowed 2"})
        }
        console.log(decode.userid)

         if (!decode || !decode.userid) {
        
       return res.status(401).json({ message: "Not allowed: Invalid token" },decode);
    }

        const olduser =await user.findById(decode.userid).select("-password")
         if(!olduser){
            return res.status(201).json({message:"Not allowed 3"})
        }

        req.user = olduser
        console.log(olduser,"hhhhhhhhhhh")

        next()



    }catch(e){
        console.log(e)
    }


}