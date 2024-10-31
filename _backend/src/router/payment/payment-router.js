const Razorpay = require('razorpay');
const express = require('express');
const paymentRouter = new express.Router();
var instance = new Razorpay({ key_id: 'rzp_test_BpkWL16gzJtqHq', key_secret: '8qtucDjGht2gPzP4n6Q8Vi51' })

paymentRouter.post('/createOrder', async (req, res) => {
    try {
      const { amount, currency } = req.body;
      const data = await instance.orders.create({
        amount: amount * 100, // amount in paise
        currency: currency,
        receipt: 'TXN_ID_' + Date.now(),
      });
      res.status(200).json({
        amount: data.amount,
        id: data.id,
        status:1
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).send({message:'Error creating order',status:2});
    }
  });

  module.exports=paymentRouter;