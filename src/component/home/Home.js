import React from "react";
import Arenas from "../arenas/Arenas";
import "./home.css";
import head from "../../image/head.svg";
import triangle1 from "../../image/triangle-top.png";
import triangle2 from "../../image/triangle-left.png";
import circle from "../../image/circle.png";

const Home = () => {
  return (
    
      <div className="home">
        <div className="header">
          <img src={triangle1} className="triangle1" alt="" />
          <img src={triangle2} className="triangle2" alt="" />
          <img src={circle} className="circle" alt="" />
          <div className="headerContainer">
            <div className="headerRow">
              <div className="headerColumn">
                <div className="textWrapper">
                  <div className="heading">Welcome to BattleArena</div>
                  <p>
                    Play competitive tournaments and win amazing cash prizes
                    instantly! Join any of the multiple tournaments happening
                    every hour, every day.
                  </p>
                  <button className="joinNow_btn">Join Now</button>
                </div>
              </div>
              <div className="headerColumn">
                <div className="imgWrapper">
                  <img className="headImg" src={head} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Home;
