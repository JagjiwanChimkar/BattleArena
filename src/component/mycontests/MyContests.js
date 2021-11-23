import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import JoinedContestCard from "./JoinedContestCard";
import './myContests.css';
import firebase from 'firebase'

const MyContests = () => {
  const user = useSelector((state) => state.user);
  // const [joined_Contests, setJoinedContests] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([]);

 
  useEffect(() => {
    if (user) {
      // db
      //   .collection('users')
      //   .doc(user?.uid)
      //   .collection('joined_contests')
      //   .get().then(snapshot => (
      //       setJoinedContests(snapshot.docs.map(doc => ({
      //           id: doc.id,
      //           contest: doc.data()
      //       })))
      //   ))
      
      var unsubscribe=db.collection('users')
      .doc(user?.uid)
      .get()
      .then(doc=>{
        doc.data().upcoming_contests.forEach(res=>res.get().then(contest=>{
          if (contest.exists) {
                setUpcomingContests(upcomingContests=>
                  [...upcomingContests,{id:contest.id,data:contest.data()}]
                )
          }else{
            db.collection('users')
            .doc(user?.uid)
            .update({
              upcoming_contests: firebase.firestore.FieldValue.arrayRemove(res)
          });
          }
        }))
      })
    }

    return unsubscribe;
  }, [user]);

  

  return (
    <div className="myContests">
      <h1>My Contests</h1>
      <p style={{margin:'20px',fontFamily:'monospace',textAlign:'center'}}>
        NOTE:- ANY TOURNAMENT SHOULD BE 75% PLAYER JOINED, OTHERWISE THE DATE WILL BE EXTEND TO THE NEXT DAY.
        <br/>❖ WINNER NEED TO CONTACT AT DISCORD SERVER TO RECEIVE WINNING AMOUNT </p>
      <div className="myContestContainer">
      {upcomingContests.length?upcomingContests.map((contest) => (
        <JoinedContestCard key={contest.id} id={contest.id} contest={contest.data} />
      )):<CircularProgress/>}
      </div>
    </div>
  );
};

export default MyContests;
