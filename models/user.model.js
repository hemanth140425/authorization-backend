import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true,
    unique:true,
    minlength:3,
    maxlength:20
   } ,
   email:{
    type:String,
    required:true,
    unique:true,
    minlength:3,
    match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
   },
   password:{
    type:String,
    required:true,
    minlength:6,
    maxlength:1024
   },

},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;