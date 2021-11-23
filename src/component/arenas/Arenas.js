import React from "react";
import Mode from "./mode/Mode";
import './arenas.css'

const Arenas = ({myRef}) => {
  return (
    <div className="arenas" ref={myRef}>
        <Mode mode="TDM" />
        <Mode mode="Classic" />
    </div>
  );
};

export default Arenas;
