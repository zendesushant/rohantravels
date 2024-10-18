const express = require('express');
const homRouter = new express.Router();
const Signup = require('../../model/signup')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

homRouter.get('/home',async (req,res,next)=>{
    let tariffs =[
        {
            img:'https://i.pinimg.com/736x/95/8e/16/958e16fd074a661dc4e2876da3ec8477.jpg',
            title:'SEDAN',
            description:' Finding your way to the airport ?, a professional driver will pick you up from your doorstep and take you directly to your terminal',
            price:'13'
        },
        {
            img:'https://etimg.etb2bimg.com/photo/72897239.cms',
            title:'SUV',
            description:' Finding your way to the airport ?, a professional driver will pick you up from your doorstep and take you directly to your terminal',
            price:'16'
        },
        {
            img:'https://imgd.aeplcdn.com/370x208/n/7lto5ua_1560265.jpg?q=80',
            title:'MINI',
            description:' Finding your way to the airport ?, a professional driver will pick you up from your doorstep and take you directly to your terminal',
            price:'12'
        },
    ]

    return res.status(200).json({data:tariffs,statusCode:1});

    },
    (err)=>{
        res.status(404).json({message:"No Data Found",statusCode:2});
    })

    module.exports=homRouter;
