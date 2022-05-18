import React from "react";
import classes from "./style.module.scss";
import background from "assets/background.jpg";
import avatar from "assets/avatar.webp";

function Header() {
  return (
    <div className={classes.container}>
      <img src={background} alt="" className={classes.background} />

      <div className={classes.profileInfo}>
        <div className={classes.avatar}>
          <img src={avatar} alt="" className={classes.avatarImg} />
        </div>
        <div className={classes.title}>Chicken donate club</div>
        <div className={classes.desc}>
          Accept donations. Start a membership. Sell anything you like. It’s
          easier than you think.
        </div>
        <div className={classes.curreny}>99 ETH</div>
      </div>
    </div>
  );
}

export default Header;
