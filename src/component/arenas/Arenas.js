import { Paper } from "@material-ui/core";
import React from "react";
import Mode from "./mode/Mode";

const Arenas = () => {
  return (
    <div className="arenas" style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"40px"}}>
        <Mode mode="TDM" />
        <Mode mode="War" />
    </div>
  );
};

export default Arenas;
