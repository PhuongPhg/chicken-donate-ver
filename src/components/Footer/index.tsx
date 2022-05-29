import React from 'react';
import classes from './style.module.scss';
import facebookIcon from 'assets/facebook.png';
import twitterIcon from 'assets/twitter.png';
import tiktokIcon from 'assets/toptop.png';
import instaIcon from 'assets/insta.png';
function Footer() {
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <span>About</span>
        <span>Privacy</span>
        <span>Terms</span>
      </div>
      <div className={classes.right}>
        <span>Join our community</span>
        <img src={twitterIcon} alt="" />
        <img src={facebookIcon} alt="" />
        <img src={instaIcon} alt="" />
        <img src={tiktokIcon} alt="" />
      </div>
    </div>
  );
}

export default Footer;
