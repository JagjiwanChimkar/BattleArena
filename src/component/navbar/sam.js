import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignIn from "../auth/SignIn";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import "./navbar.css";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const user = useSelector((state) => state.user);

  return (
    <>
    <div className="navbar">
      <Link to="/">
        <h1 className="site-logo">BattleArena</h1>
      </Link>
      <div className="MobileIcon" onClick={handleClick}>
        {click ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
      </div>
      <ul className="navMenu" onClick={handleClick}>
        <li className="navItem">
          <Link to="/" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>

        {user && (
          <li className="navItem">
            <Link to="/mycontests" onClick={closeMobileMenu}>
              My Contests
            </Link>
          </li>
        )}
        <li className="navItem">
          <Link to="/contact" onClick={closeMobileMenu}>
            Contact Us
          </Link>
        </li>
        <li className="navItem">
          <Link to="/about" onClick={closeMobileMenu}>
            About Us
          </Link>
        </li>
        <li className="signin" onClick={closeMobileMenu}>
          <SignIn />
        </li>
      </ul>
    </div>
    </>
  );
};

export default NavBar;
