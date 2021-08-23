import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import "./contestCard.css";

function ContestCard({ id, data,mode,category }) {
  let history = useHistory();
  const user = useSelector((state) => state.user);

   function handleClick() {
    if (!user) {
      var provider = new firebase.default.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result=>{
            // console.log('from signin',result.user.metadata.creationTime)
            if(result.user.metadata.creationTime===result.user.metadata.lastSignInTime){
              console.log('first time login');
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
        <div className="container">
          <div className="prize">
            <h4>Prize</h4>
            <p>₹{data.prize}</p>
          </div>
          <h3>{}</h3>

          <div className="entry">
            <h4>Entry</h4>
            <p>₹{data.entry_fee}</p>
          </div>
        </div>

        <div className="info">
          <div>
            <p>Date</p>
            <h5>{data.date_time.toDate().toDateString()}</h5>
          </div>
          <div>
            <p>Time</p>
            <h5>{data.date_time.toDate().toLocaleTimeString()}</h5>
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
