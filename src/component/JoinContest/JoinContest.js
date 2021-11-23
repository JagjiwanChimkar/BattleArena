import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import firebase from "firebase";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {Link}  from "react-router-dom";
import "./JoinContest.css";

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    margin: theme.spacing(1),
  },
}));

function JoinContest() {
  const classes = useStyles();
  let { mode, category, id } = useParams();
  const { user } = useSelector((state) => state);
  const [data, setData] = useState({});

  const initialPlayers = [
    { username: "", bgmi_id: 0 },
    { username: "", bgmi_id: 0 },
    { username: "", bgmi_id: 0 },
    { username: "", bgmi_id: 0 },
  ];
  const [players, setPlayers] = useState(initialPlayers);

  let playersNumber = { Solo: 1, Duo: 2, Squad: 4 };

  const history = useHistory();

  async function handlePayment() {
    //https://homdeep-backend.herokuapp.com/razorpay
    //http://localhost:1337/razorpay
    //https://us-central1-homdeep-f855d.cloudfunctions.net/api/razorpay
    //http://localhost:5001/homdeep-f855d/us-central1/api/razorpay
    
    if (!data) {
      alert("Server error. Are you online?");
      return;
    }
    
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

          //add players detail in contest
          for (var i = 0; i < playersNumber[category]; i++) {
           await db.collection(`modes/${mode}/${category}/${id}/players`)
              .doc(players[i].username)
              .set({
                username: players[i].username,
                bgmi_id: players[i].bgmi_id,
                order_id: confirmation.data.orderId,
              });
          }

          //add contest in user data
          await db.collection("users")
            .doc(user?.uid)
            .update({
              upcoming_contests: firebase.firestore.FieldValue.arrayUnion(
                db.doc(`/modes/${mode}/${category}/${id}`)
              ),
            });

          //increment participant_count in contest
          await db.doc(`/modes/${mode}/${category}/${id}`).update({
            participants_count: firebase.firestore.FieldValue.increment(
              playersNumber[category]
            ),
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

  const getData = async () => {
    await axios
      .post(
        `https://us-central1-homdeep-f855d.cloudfunctions.net/api/razorpay/${mode}/${category}/${id}`
      )
      .then((res) => setData(res.data));
  };
  useEffect(() => {
    getData();
    return () => {
      setData({});
    };
  }, []);

  return (
    <div className="joinContest">
      <form onSubmit={handleSubmit} className={classes.root}>
        <h2 style={{ marginBottom: "30px" }}>Fill the Details</h2>
        {Array(playersNumber[category])
          .fill()
          .map((_, i) => (
            <div key={i} className="player_detail">
              <TextField
                className={classes.margin}
                id="outlined-basic"
                type="text"
                label={`Enter UserName ${i + 1}`}
                onChange={(e) => {
                  let temp_players = [...players];
                  let temp_player = { ...players[i] };
                  temp_player.username = e.target.value;
                  temp_players[i] = temp_player;
                  setPlayers(temp_players);
                }}
                variant="outlined"
                required
              />

              <TextField
                className={classes.margin}
                type="number"
                label="Enter BGMI-ID"
                onChange={(e) => {
                  let temp_players = [...players];
                  let temp_player = { ...players[i] };
                  temp_player.bgmi_id = e.target.value;
                  temp_players[i] = temp_player;
                  setPlayers(temp_players);
                }}
                variant="outlined"
                required
              />
            </div>
          ))}
        <Link to='/rules'><p className="rulesBtn">Click to Read Game-Rules</p></Link>
        <button type="submit" className="payment_btn" disabled={!data.amount}>
          Pay {data.amount ? `₹${data.amount / 100}` : ""}
        </button>
      </form>
    </div>
  );
}

export default JoinContest;
