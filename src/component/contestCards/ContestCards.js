import React from 'react'
import ContestCard from './contestCard/ContestCard';
import './ContestCards.css';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function ContestCards() {
    const matches=useSelector(state => state.matches);
    const {mode,category}=useParams();
    console.log('contestcard:',matches.mode[mode][category])
    var contests=matches?.mode[mode][category];
    console.log(contests)
    return (
        <div className="contestCards">
            {contests.map(match=>(
                <ContestCard key={match.id} id={match.id} data={match.data}/>
            ))}
        </div>
    )
}

export default ContestCards
