import React from 'react'
import { useHistory } from 'react-router-dom';

const CategoryCard = ({mode,category}) => {
    const history=useHistory();
    const handleClick=()=>{
        history.push(`/contest/${mode}/${category.name}`);
    }

    return (
        <div className="CategoryCard" onClick={handleClick}>
            <div className="img">
                <img src={category.img} alt=""/>
            </div>
            <div className="catergory">
                <p>{category.name}</p>
            </div>
            <div className="info">
                <p>{category.info}</p>
            </div>
        </div>
    )
}

export default CategoryCard
