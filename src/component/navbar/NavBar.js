import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignIn from "../auth/SignIn";
import './navbar.css'

const NavBar = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
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
