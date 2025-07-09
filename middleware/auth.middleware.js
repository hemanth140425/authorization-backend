import { JWT_SECRET } from "../config/env";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const authorize = async (req ,res , next)=>{
    try{
        let token=req.headeres.authorization;
        if(!token) return res.status(401).json({message : "unauthorized"});
        token=token.split(" ")[1];
        if(!token) return res.status(401).json({message : "unauthorized"});
        const decoded= jwt.verify(token,JWT_SECRET);
        const user = await User.findById(decoded._id);
        if(!user) return res.status(401).json({message : "unauthorized"});
        req.user = user;
        next();

    }catch(error){
        res.status(401).json({
            message : "unauthorized" , 
            error : error.message
        })
    }
}
export default authorize;