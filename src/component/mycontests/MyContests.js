import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import JoinedContestCard from "./JoinedContestCard";
import './myContests.css'

const MyContests = () => {
  const user = useSelector((state) => state.user);
  const [joined_Contests, setJoinedContests] = useState([]);

  // const getUpcomingContests = () => {
  //   db.doc(`users/${user.uid}`).get().then((snap) => {
  //     if (snap.contest().upcoming_contests) {
  //       const match=[];
  //       var match_len;
  //       snap
  //         .contest()
  //         .upcoming_contests.forEach(async(contest) =>{
  //            match_len=await contest.get().then((res) => match.push({contest:res.contest()}))
  //         })
  //        console.log(match_len) 
  //        console.log(snap.contest().upcoming_contests.length) 
  //       if(match_len===snap.contest().upcoming_contests.length){
  //         setUpcomingContests(match)
  //       }
  //     }
  //   });
  // };
  useEffect(() => {
    if (user) {
      db
        .collection('users')
        .doc(user?.uid)
        .collection('joined_contests')
        .get().then(snapshot => (
            setJoinedContests(snapshot.docs.map(doc => ({
                id: doc.id,
                contest: doc.data()
            })))
        ))
    }
  }, [user]);

  

  return (
    <div className="myContests">
      <h1>My Contests</h1>
      <div className="myContestContainer">
      {joined_Contests.length?joined_Contests.map((contest) => (
        <JoinedContestCard key={contest.id} contest={contest.contest} />
      )):<CircularProgress/>}
      </div>
    </div>
  );
};

export default MyContests;
