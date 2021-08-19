import React from 'react'
import CategoryCard from './categoryCard/CategoryCard'

const Mode = ({mode}) => {
    if(mode==="War"){
        return (
            <div>
                <CategoryCard mode={mode} category={{name:"solo",info:"Solo:",img:""}}/>
                <CategoryCard mode={mode} category={{name:"duo",info:"Duo:",img:""}}/>
                <CategoryCard mode={mode} category={{name:"squad",info:"Squad:",img:""}}/>
            </div>
        )
    }else{
        return(
            <div>
                <CategoryCard mode={mode} category={{name:"solo",info:"1 vs 1",img:""}}/>
                <CategoryCard mode={mode} category={{name:"duo",info:"2 vs 2",img:""}}/>
                <CategoryCard mode={mode} category={{name:"squad",info:"4 vs 4",img:""}}/>
            </div>
        )
    }
}

export default Mode
