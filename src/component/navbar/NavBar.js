import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignIn from "../auth/SignIn";
import "./navbar.css";
// import { Button, IconButton, Typography } from "@material-ui/core";
// import MenuIcon from '@material-ui/icons/Menu';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';


const NavBar = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
    

      <Link to="/">
        <h1>Join and Win</h1>
      </Link>

      <div className="navbar">
        <div className="signin">
          <h4 style={{ textAlign: "center" }}>
            Hello {!user ? "Guest" : user.displayName}
          </h4>
          <span>
            <SignIn />
          </span>
        </div>

        <Link to="/profile">
          <div className="profile">
            <p>Profile</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
