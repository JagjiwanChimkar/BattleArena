import React, { useEffect, useState } from "react";
import ContestCard from "./contestCard/ContestCard";
import "./ContestCards.css";
import { useParams } from "react-router-dom";
import NoContest from "./NoContest";
import { CircularProgress } from "@material-ui/core";
import { db } from "../../firebase";

function ContestCards() {
  const { mode, category } = useParams();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  
 useEffect(() => {
   const unsubscribe=db.collection(`modes/${mode}/${category}`)
   .onSnapshot(snap=>{
    setContests(snap.docs.map(match=>({
       id:match.id,
       data:match.data()
     })));
     setLoading(false);
   })
  
   return unsubscribe;
 }, [])
  return (
    <div className="contestCardsContainer">
        <p>{`${mode}-${category.toUpperCase()}`}</p>
      {loading ? <CircularProgress /> : contests?.length ? (
        <div className="contestCards">
          {contests?.map((match) => (
            <ContestCard
              key={match.id}
              id={match.id}
              data={match.data}
              mode={mode}
              category={category}
            />
          ))}
        </div>
      ) : (
        <NoContest />
      )}
    </div>
  );
}

export default ContestCards;
