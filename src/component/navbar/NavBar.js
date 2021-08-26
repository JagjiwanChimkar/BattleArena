import React, { useState} from 'react';
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
} from './Navbar.elements';
import SignIn from '../auth/SignIn';
import { useSelector } from 'react-redux';


function Navbar() {
  const [click, setClick] = useState(false);
  
  const user = useSelector((state) => state.user);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
        <Nav>
          <NavbarContainer>
            <NavLogo to='/' onClick={closeMobileMenu}>
             BattleArena
            </NavLogo>
            <MobileIcon onClick={handleClick}>
              {click ?<CloseRoundedIcon style={{fontSize: '32px'}} /> : <MenuRoundedIcon style={{fontSize: '32px'}} />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to='/' onClick={closeMobileMenu}>
                  Home
                </NavLinks>
              </NavItem>
              {user && 
              <NavItem>
              <NavLinks to='/mycontests' onClick={closeMobileMenu}>
              My Contests
              </NavLinks>
            </NavItem>}
              <NavItem>
                <NavLinks to='/contact' onClick={closeMobileMenu}>
                Contact Us
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='/about' onClick={closeMobileMenu}>
                  About Us
                </NavLinks>
              </NavItem>
              <NavItemBtn>
              <SignIn />
              </NavItemBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>
    </>
  );
}

export default Navbar;
