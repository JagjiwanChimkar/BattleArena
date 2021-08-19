const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const admin = require('firebase-admin');
const shortid = require('shortid')

// API

// - App config
const app = express();

admin.initializeApp();
const db = admin.firestore();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes

const razorpay = new Razorpay({
      key_id: "rzp_test_YtqQkFkoXk1skz",
      key_secret: "JlflSpIfuRB4hAQIqjMuL7Yi"
    //key_id: functions.config().razorpay.test.key_id,
    //key_secret: functions.config().razorpay.test.key_secret
});
  
app.get("/", (req, res) => {
    res.send("App is running");
});
  
app.post("/razorpay/:id", async (req, res) => {
    const match_id=req.params.id;
    try {
      const doc = await db.collection('Match').doc(match_id).get();
      const data=doc.data();
      
      var options = {
        amount: data.entry_fee*100, // amount in the smallest currency unit
        currency: "INR",
        receipt:  shortid.generate(),
      };
      const response = await razorpay.orders.create(options);
      console.log(response);
  
      res.send({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
    }
});
  
app.post("/success", (req, res) => {
    try {
      // do a validation
      //const secret = functions.config().test.key_secret;
      const secret ="JlflSpIfuRB4hAQIqjMuL7Yi";

      const {
          orderCreationId,
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
        } = req.body;
  
      //console.log("req.body : ", req.body);
  
      
  
      const shasum = crypto.createHmac("sha256", secret);
      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
      const digest = shasum.digest("hex");
  
      
  
      if (digest === razorpaySignature) {
        console.log("Transaction is legit");
      } 
      
      res.json({
          msg: 'success',
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
        });
        
    } catch (error) {
      res.status(500).send(error);
    }
});

// - Listen command
exports.api = functions.https.onRequest(app);