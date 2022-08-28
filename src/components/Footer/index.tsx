import React from 'react';
import classes from './style.module.scss';
import facebookIcon from 'assets/facebook.png';
// import twitterIcon from 'assets/twitter.png';
// import tiktokIcon from 'assets/toptop.png';
// import instaIcon from 'assets/insta.png';
import { Link } from 'react-router-dom';
import { ClientRoutesEnum } from 'enums/routes';
function Footer() {


  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Link to={ClientRoutesEnum.ABOUT}>
          <span>About</span>
        </Link>
        <Link to={ClientRoutesEnum.PRIVACY}>
          <span>Privacy</span>
        </Link>
        <Link to={ClientRoutesEnum.TERMS}>
          <span>Terms</span>
        </Link>
      </div>
      <div className={classes.right}>
        <span>Join our community</span>
        {/* <img src={twitterIcon} alt="" /> */}
        <a href="https://www.facebook.com/chicken.donate" target="_blank" rel="noreferrer">
          <img src={facebookIcon} alt="" />
        </a>
        {/* <img src={instaIcon} alt="" /> */}
        {/* <img src={tiktokIcon} alt="" /> */}
      </div>
    </div>
  );
}

export default Footer;
