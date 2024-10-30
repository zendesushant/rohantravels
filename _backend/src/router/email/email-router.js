const express = require('express');
const sendEnquiryEmail = require('../../templates/js/send-enquiry')
const emailRouter = new express.Router();

emailRouter.post('/sendenquiry',async (req,res,next)=>{

    let isEmailSent = sendEnquiryEmail.sendEmail(req.body);
    if (isEmailSent) {
        res.status(200).send({message:"Email sent successfully",statusCode:200});
      } else {
        res.status(500).send({message:"An Error Occurred",statusCode:500});
      }
},
(err)=>{
    res.status(500).json({message:"An Error Occurred",statusCode:500});
})

module.exports = emailRouter;
