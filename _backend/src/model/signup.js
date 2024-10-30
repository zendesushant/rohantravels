const mongoose =  require('mongoose');
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator');
const customFunctions = require('../custom-functions/custom-functions')
const jwt=require('jsonwebtoken');
let signupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    }
    
})

signupSchema.statics.findUserByCredentials = async function findUserByCredentials(email,password){
   const user = await Signup.findOne({username:email});

   if(!user){
        return ({message:"This email is not connected to any account", statusCode:2})
   }
   const isPasswordMatched = await bcrypt.compare(password,user.password)

    if(!isPasswordMatched){
        return ({message:"Invalid Password", statusCode:2})
    }
    return ({message:"Authenticated", statusCode:1, user:user});
}

signupSchema.statics.findIfUserAlreadyRegistered = async function findIfUserAlreadyRegistered(email){
    const user = await Signup.findOne({username:email});
    if(!user){
         return ({message:"User does not exist", statusCode:1})
    }
     return ({message:"Email already exist, Try to login", statusCode:2});
 }

signupSchema.methods.getAuthToken = async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},'secretekey',{expiresIn:3600});
    user.token = token;
    await user.save();
    return ({token:token,expiresIn:3600});
}
signupSchema.plugin(uniqueValidator)
const Signup = mongoose.model('Signup',signupSchema);
module.exports = Signup;