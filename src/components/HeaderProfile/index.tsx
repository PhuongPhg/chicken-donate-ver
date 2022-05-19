import React from "react";
import classes from "./style.module.scss";
import background from "assets/background.jpg";
import { IOrganisation } from "types/organisation";

function Header(props: IOrganisation) {
  const { description, name, photoUrl } = props;
  return (
    <div className={classes.container}>
      <img src={background} alt="" className={classes.background} />

      <div className={classes.profileInfo}>
        <div className={classes.avatar}>
          <img src={photoUrl} alt="" className={classes.avatarImg} />
        </div>
        <div className={classes.title}>{name}</div>
        <div className={classes.desc}>{description}</div>
        <div className={classes.curreny}>99 ETH</div>
      </div>
    </div>
  );
}

export default Header;
