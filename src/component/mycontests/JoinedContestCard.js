import React from 'react';
import './JoinedContestCard.css'

const JoinedContestCard = ({contest}) => {
    console.log(contest)
    return (
        <div className="card">
        <div className="container">
          <div className="prize">
            <h4>Prize</h4>
            <p>₹{contest.prize}</p>
          </div>
          <p className="type">{contest.name.toUpperCase()}</p>

          <div className="entry">
            <h4>Entry</h4>
            <p>₹{contest.entry_fee}</p>
          </div>
        </div>

        <div className="info">
          <div>
            <p>Date</p>
            <h5>{contest.date_time.toDate().toDateString()}</h5>
          </div>
          <div>
            <p>Time</p>
            <h5>{contest.date_time.toDate().toLocaleTimeString()}</h5>
          </div>
          <div>
            <p>Map</p>
            <h5>{contest.map.toUpperCase()}</h5>
          </div>
          <div>
            <p>Mode</p>
            <h5>{contest.mode.toUpperCase()}</h5>
          </div>
        </div>
        <div className="roomDet">
          <div className="room_id">
           <p>Room ID:</p> 
            {contest.room_id}
          </div>
          <div className="room_password">
            <p>Room Password:</p>
            {contest.room_password}
          </div>
        </div>
      </div>
    )
}

export default JoinedContestCard
