const mongoose = require('./db/db');

const express=require('express');
const authRouter = require('./router/auth/auth-router');
const homeRouter = require('./router/home/home-router');
const mapRouter = require('./router/map/map-router');
const serviceRouter = require('./router/services/services-router');
const emailRouter = require('./router/email/email-router');
const paymentRouter = require('./router/payment/payment-router');
const app=express();
const port=process.env.port||3000;

app.use(express.json())
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,Authorization,Content-Type");
    res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,PATCH,DELETE,FETCH");
    next();
})

app.use(authRouter);
app.use(mapRouter);
app.use(paymentRouter);
app.use(homeRouter);
app.use(serviceRouter);
app.use(emailRouter);
app.listen(port,()=>{
    console.log('Connected to Port : '+port);
})