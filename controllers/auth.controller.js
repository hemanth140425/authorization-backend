import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const signup = async (req,res)=>{
   const session = await mongoose.startSession();
   session.startTransaction();
   try{
      const {name,email,password} = req.body;
      const existinguser = await User.findOne({email});
      if(existinguser){
         return res.status(400).json({message:'User already exists'});
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);
      const newUser = await User.create([{
        name,
        email,
        password: hashedPassword
    }]);
      console.log(newUser);
      const token = jwt.sign({userId:newUser[0]._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
      await session.commitTransaction();
      session.endSession();
      res.status(201).json({
        message:'User created successfully'
    });
   }catch(error){
      await session.abortTransaction();
      session.endSession();
      throw error;
   }
}
export const signin = async (req,res)=>{
   try{
      const {email,password} = req.body;
      const user = await User.findOne({email});
      if(!user){
         return res.status(400).json({message:'User does not exist'});
      }
      const isPasswordCorrect = await bcrypt.compare(password,user.password);
      if(!isPasswordCorrect){
         return res.status(400).json({message:'Invalid credentials'});
      }
      const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
      res.status(200).json({
        sucess:true,
         message:'User signed in successfully',
         data:{
            token,
            user,
         }
      })
   }catch(error){

   }
}
export const signout = async ( req,res)=>{
    try{





        
        res.clearCookie('token');
        res.status(200).json({
            message:'User signed out successfully'
        })  
    }catch(error){

    }
}
