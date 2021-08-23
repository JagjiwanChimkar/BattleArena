import React  from 'react'
import ContestCard from './contestCard/ContestCard';
import './ContestCards.css';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';



function ContestCards() {
    const {mode,category}=useParams();
    const matches=useSelector(state => state?.matches.mode[mode][category]);
    console.log('contestcard:',matches)
    
   
    return (
        <div className="contestCards">
            {matches?.map(match=>(
                <ContestCard key={match.id} id={match.id} data={match.data} mode={mode} category={category}/>
            ))}
        </div>
    )
}

export default ContestCards
