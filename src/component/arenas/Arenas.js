import React from 'react'
import Mode from './mode/Mode'

const Arenas = () => {
    return (
        <div className="arenas">
            <Mode mode="TDM"/>
            <Mode mode="War"/>
        </div>
    )
}

export default Arenas
