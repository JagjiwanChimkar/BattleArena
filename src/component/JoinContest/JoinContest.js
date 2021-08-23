import React from "react";
import "./JoinContest.css";
import axios from "axios";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import firebase from "firebase";


function JoinContest() {
  let { mode,category,id } = useParams(); //retrive id from '/join/:id'
  const matches = useSelector((state) => state.matches);
   
  
  const [user, setUser] = useState({
    username: "",
    bgmi_id: 0,
  });

  const history = useHistory();

  async function handlePayment() {
    
    // const res = loadScript(
    //   "https://checkout.razorpay.com/v1/checkout.js"
    // );

    // if (!res) {
    //   alert("Razorpay SDK failed to load. Are you online?");
    //   return;
    // }

    //https://homdeep-backend.herokuapp.com/razorpay
    //http://localhost:1337/razorpay
    //https://us-central1-homdeep-f855d.cloudfunctions.net/api/razorpay
    //http://localhost:5001/homdeep-f855d/us-central1/api/razorpay
    const { data } = await axios.post(
      `http://localhost:5001/homdeep-f855d/us-central1/api/razorpay/${mode}/${category}/${id}`
    );

    if (!data) {
      alert("Server error. Are you online?");
      return;
    }
    console.log(data);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_TEST_KEY_ID,
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "GamerSide",
      description: "Play and Win",
      handler: async function (response) {
        console.log('from server',response);

        const dataConfirm = {
          orderCreationId: data.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const confirmation = await axios.post(
          "http://localhost:5001/homdeep-f855d/us-central1/api/success",
          dataConfirm
        );

        console.log("payment detail", confirmation.data);

        if (confirmation.data.msg === "success") {
          alert("Payment Successful");

          db.collection(`modes/${mode}/${category}`)
          .doc(id)
          .update({
            players: firebase.firestore.FieldValue.arrayUnion(
              {username:user.username,bgmi_id:user.bgmi_id,order_id:confirmation.data.orderId}
            )
          });
        }
        history.replace("/");
      },
      prefill: {
        name: user.username,
      },
    };

    
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }



  const handleSubmit = (e) => {
    e.preventDefault();

     handlePayment();
  };

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter UserName"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Enter BGMI-ID"
          onChange={(e) => setUser({ ...user, bgmi_id: e.target.value })}
          required
        />
        <button type="submit">
          Pay ₹{matches.mode[mode][category].find((x) => x.id === id)?.data.entry_fee}
        </button>
      </form>
    </div>
  );
}

export default JoinContest;
