import React from "react";
import { Link } from "react-router-dom";
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import discord from '../../image/discord.svg'
import './footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="socialMediaWrap">
        <Link to="/" className="logo">
           BattleArena
        </Link>
        <small className="websiteRight">BattleArena © 2021</small>
        <div className="socialIcons">
        
        <a href='/' target='_blank' className="socialIconsLink" aria-label='Instagram'><InstagramIcon/></a>
        <a href='/' target='_blank' className="socialIconsLink" aria-label='Facebook'><FacebookIcon/> </a>
        <a href='/' target='_blank' className="socialIconsLink" aria-label='Youtube'><YouTubeIcon/></a>
        <a href='/' target='_blank' className="socialIconsLink" aria-label='Twitter'><TwitterIcon/></a>
        <a href='/' target='_blank' className="socialIconsLink" aria-label='Discord'><img src={discord} alt=""/></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
