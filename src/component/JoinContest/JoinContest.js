import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import firebase from "firebase";
import { CircularProgress, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "./JoinContest.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems:'center',
    padding: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  }
}));

function JoinContest() {
  const classes = useStyles();
  let { mode, category, id } = useParams(); 
  const {user} = useSelector((state) => state);
  const [data, setData] = useState({});
  
  let playersNumber = { Solo: 1, Duo: 2, Squad: 4 };

  const players = [
    {
      username: "",
      bgmi_id: "",
    },
    {
      username: "",
      bgmi_id: "",
    },
    {
      username: "",
      bgmi_id: "",
    },
    {
      username: "",
      bgmi_id: "",
    },
  ];

  const history = useHistory();
  
  

  const getData=async()=>{
    await axios.post(
      `https://us-central1-homdeep-f855d.cloudfunctions.net/api/razorpay/${mode}/${category}/${id}`
    )
    .then(res=>setData(res.data));
   
  }
  useEffect(() => {
    getData(); 
    return ()=>{
      setData({})
    }
  }, [])

  console.log(data);

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
        console.log("from server", response);

        const dataConfirm = {
          orderCreationId: data.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const confirmation = await axios.post(
          "https://us-central1-homdeep-f855d.cloudfunctions.net/api/success",
          dataConfirm
        );

        console.log("payment detail", confirmation.data);

        if (confirmation.data.msg === "success") {
          alert("Payment Successful");

          //add players deatail in contest
          for (var i = 0; i < playersNumber[category]; i++) {
            db.collection(`modes/${mode}/${category}/${id}/players`)
              .doc(players[i].username)
              .set({
                username: players[i].username,
                bgmi_id: players[i].bgmi_id,
                order_id: confirmation.data.orderId,
              });
          }

          
          //add contest when user joined
          db.doc(`/modes/${mode}/${category}/${id}`)
            .get()
            .then((res) => {
              db.collection(`users/${user.uid}/joined_contests`)
                .doc(id)
                .set(res.data());
            });

          //increment participant_count in contest
          db.doc(`/modes/${mode}/${category}/${id}`)
          .update({
            participants_count : firebase.firestore.FieldValue.increment(playersNumber[category])
        });
        }
        history.replace("/mycontests");
      },
      prefill: {
        name: user.username,
        email: user.email,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(players);
    handlePayment();
  };

  return (
    <div className="joinContest">
      <h2>Fill the Details</h2>
      <form onSubmit={handleSubmit} className={classes.root}>
        {Array(playersNumber[category])
          .fill()
          .map((_, i) => (
            <div key={i}>
              <TextField 
              className={classes.margin}
              id="outlined-basic"
               type="text" 
               label={`Enter UserName ${i + 1}`} 
               onChange={(e) => {
                Object.assign(players[i], { username: e.target.value });
              }}
              variant="outlined"
              required
              />

              <TextField
              className={classes.margin}
                type="number"
                label="Enter BGMI-ID"
                onChange={(e) =>
                  Object.assign(players[i], { bgmi_id: e.target.value })
                }
                variant="outlined"
                required
              />
            </div>
          ))}
        {
          data.amount?
            (<button type="submit" className="join_btn">
            Pay ₹
            {data?.amount/100}
           </button>):<CircularProgress />
        }
        
      </form>
    </div>
  );
}

export default JoinContest;
