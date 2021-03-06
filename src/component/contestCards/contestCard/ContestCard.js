import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import "./contestCard.css";
import {  withStyles } from '@material-ui/core/styles';
import { LinearProgress } from "@material-ui/core";
import moment from "moment";


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 4,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

function ContestCard({ id, data, mode, category }) {
  let history = useHistory();
  const user = useSelector((state) => state.user);

  function handleClick() {
    if(data.participants_capacity===data.participants_count){
        alert("Contest is Full")
        return;
    }

    else if (!user) {
      var provider = new firebase.default.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // console.log('from signin',result.user.metadata.creationTime)
          if (
            result.user.metadata.creationTime ===
            result.user.metadata.lastSignInTime
          ) {
            console.log("first time login");
          }
        })
        .catch();
      return;
    }
    history.push(`/contest/${mode}/${category}/join/${id}`);
  }

  
  
  return (
    <>
      <div className="card">
      <div className="contest-id">
           <p> Contest-Id : &emsp; {id}</p>
          </div>
        <div className="container">
          <div className="prize">
            <h4>Prize</h4>
            <p>₹{data.prize}</p>
          </div>
          <div className="entry">
            <h4>Entry</h4>
            <p>₹{data.entry_fee}</p>
          </div>
        </div>
        <div className="playersReg">
          <BorderLinearProgress variant="determinate" value={ (  data.participants_count /data.participants_capacity ) * 100} />
          <div className="playersDetail">
            <div>{data.participants_count} Joined</div>
            <div>
              {data.participants_capacity - data.participants_count} Remaining
            </div>
          </div>
        </div>

        <div className="info">
          <div>
            <p>Date</p>
            <h5>{moment(data.date_time.substr(0,data.date_time.indexOf('T'),["YYYY-MM-DD"])).format('DD-MM-YYYY')}</h5>
          </div>
          <div>
            <p>Time</p>
            <h5>{moment(data.date_time.substr(data.date_time.indexOf('T')+1),["HH:mm"]).format("hh:mm a")}</h5>
          </div>
          <div>
            <p>Map</p>
            <h5>{data.map.toUpperCase()}</h5>
          </div>
          <div>
            <p>Mode</p>
            <h5>{data.mode.toUpperCase()}</h5>
          </div>
        </div>
        <div className="joinNow">
          <button className="button" onClick={handleClick}>
            Join Now
          </button>
        </div>
      </div>
    </>
  );
}

export default ContestCard;
