const jwt=require('jsonwebtoken');
const Signup=require('../model/signup');
const auth=async(req,res,next)=>{

    try{
    const token=req.header('Authorization').replace('Bearer ','');
    const decode=jwt.verify(token,'secretekey');
    const user=Signup.findOne({_id:decode._id, token:token});
    /*
        const token = req.headers.authorization.split(" ")[1]
    */
  if(!user)
  {
      throw new Error("UnAuthorized");
  }
    req.token = token;
    req.user = user;
    next();
    }
    catch(message)
    {
        res.status(401).send({message:message});
    }
 
   
}

module.exports=auth;