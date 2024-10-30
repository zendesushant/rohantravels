const express = require('express');
const servicesRouter = new express.Router();
const Signup = require('../../model/signup')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

servicesRouter.get('/services',async (req,res,next)=>{
    let services = [
        {
            img:'https://images.unsplash.com/photo-1574499024012-0bd5d1332c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFpcnBvcnQlMjB0cmFuc2ZlcnxlbnwwfHwwfHx8MA%3D%3D',
            title:'AIRPORT TRANSFERS',
            description:'Finding your way to the airport ? A professional driver will pick you up from your doorstep, We care about your flight as much as you do.  Our airport transfer services offer pickups and drops with complete reliability. Book in advance and rest easy - we will take care of the rest.'
        },
        {img:'https://images.unsplash.com/photo-1513653950649-94b53fd8770c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNpdHklMjBjYWJzfGVufDB8fDB8fHww',title:'CITY TRANSFERS',description:'Book our flexible hourly rental cabs and get chauffeured quickly and comfortably to anywhere in your city. Our local rentals are available for 4 hours, 8 hours or 12 hours, based on your needs. Explore your city like a local.'},
        {img:'https://images.unsplash.com/photo-1543265832-56c79a5caf97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHRyaXB8ZW58MHx8MHx8fDA%3D',title:'OUT STATION RIDES',description:'Our premium roundtrip services will pamper you with an absolutely comfortable drive from your doorstep & back. Our chauffeurs are not only courteous but are also expert travel companions that will make your road travel memorable. Affordable Luxury, as we’d like to call it.'},
        {img:'https://shreejitoursntravels.in/wp-content/uploads/2018/09/mumbai-darshan2-2.jpg',title:'MUMBAI DARSHAN',description:"Mumbai Darshan the most affordable service to Explore the City. And a popular way to explore the famous landmarks and attraction"},
    ]

    return res.status(200).json({data:services,statusCode:1});


},
(err)=>{
    res.status(404).json({message:"No Data Found",statusCode:2});
})

module.exports=servicesRouter;