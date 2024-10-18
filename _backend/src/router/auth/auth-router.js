const express = require('express');
const authRouter = new express.Router();
const customFunctions = require('../../custom-functions/custom-functions')
const Signup = require('../../model/signup')
const jwt=require('jsonwebtoken');
const auth = require('../../middleware/middleware')
const bcrypt=require('bcrypt');

    authRouter.post('/login',async (req,res,next)=>{
            let checkIfUserRegistered = await Signup.findUserByCredentials(customFunctions.convertToLowerCase(req.body.username), req.body.password);
            if(checkIfUserRegistered.statusCode === 1){
                let token = await checkIfUserRegistered.user.getAuthToken();
                res.status(200).json({token:token});
            }else{
                res.status(401).json(checkIfUserRegistered);
            }
        },
        (err)=>{
            res.status(500).json({message:"Server Error",statusCode:2});
        }
    )

    authRouter.post('/logout', auth, async (req,res,next)=>{
        try{
            Signup.updateOne({token:req.token}, { $unset: { token: 1 } })
            .then(() => res.status(200).send())
            .catch(err => res.status(401).send()); 
        }catch{
                res.status(500).send()
        }
    })

    authRouter.post('/signup',async (req,res,next)=>{
        let checkIfUserAlreadyRegistered = await Signup.findIfUserAlreadyRegistered(customFunctions.convertToLowerCase(req.body.username));
        console.log(checkIfUserAlreadyRegistered)
        if(checkIfUserAlreadyRegistered.statusCode === 2)
            res.status(409).json(checkIfUserAlreadyRegistered);
        else
        {
            bcrypt.hash(req.body.password,8).then((hasedPassword)=>{
                const user = new Signup({
                    name:req.body.name,
                    username:customFunctions.convertToLowerCase(req.body.username),
                    mobile:req.body.mobile,
                    password:hasedPassword
                })
                console.log("==============")
                console.log(user)
                user.save().then(async (user)=>{
                    let token = await user.getAuthToken();
                    res.status(200).json({token:token});
                }).catch((err)=>{
                    console.log(err)
                    res.status(500).json({message:'Failed to Create User'});
                })
            })
        }
    })
    module.exports=authRouter;