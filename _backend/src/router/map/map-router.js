const express = require('express');
const axios = require('axios');
const mapRouter = new express.Router();
var distance = require('google-distance-matrix');

const API_KEY = "AIzaSyDkMu3AfWtzBmN2eYRR7hY0jbviALvpFlk";

mapRouter.get('/distance',async (req,res,next)=>{
    var origins = [];
    var destinations = [];
    origins.push(req.query.origin);
    destinations.push(req.query.destination);
    distance.key(API_KEY);
    distance.units('metric');
    distance.mode('driving');
    distance.departure_time(Date.now());
    distance.matrix(origins, destinations, function (err, distances) {
    if (err) {
        res.status(404).json({message:err,statusCode:2});
    }
    if(!distances) {
        res.status(404).json({message:'No Distances Found',statusCode:2})
    }
    if (distances.status == 'OK') {
            var distance = distances.rows[0].elements[0];
            res.status(200).json({data:distance,statusCode:1})
        }
    });
},
(err)=>{
    res.status(404).json({message:"No Data from API",statusCode:2});
})
mapRouter.get('/autocomplete',async (req,res,next)=>{
        const input  = req.query.input;
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&strictbounds=true&radius=1500000&location=20.5937,78.9629&key=${API_KEY}`;
        try {
          const response = await axios.get(url);
          let searchArray = response.data.predictions;
          let descriptionArray = [];
          for(let i of searchArray){
              descriptionArray.push(i.description)
          }
          res.status(200).json({data:descriptionArray,statusCode:1});
        } catch (error) {
          res.status(500).send({message:error.message,statusCode:2});
        }
},
(err)=>{
    res.status(404).json({message:"No Data from API",statusCode:2});
})

module.exports=mapRouter;