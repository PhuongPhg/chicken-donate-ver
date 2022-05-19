import React from "react";
import classes from "./style.module.scss";
import heartIcon from "assets/heart.svg";
import lockIcon from "assets/lock.svg";
import eggIcon from "assets/egg-donate-box.svg";
import xIcon from "assets/x.svg";
import { IOrganisation } from "types/organisation";

function ProfileDetail(props: IOrganisation) {
  const { description, photoUrl } = props;
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.donorBox}>
          <img src={photoUrl} alt="" className={classes.img}></img>
          <div className={classes.detail}>
            <p className={classes.text}>{description}</p>
          </div>
        </div>
        <div className={classes.supported}>RECENT DONORS</div>
      </div>
      <div className={classes.donate}>
        <div className={classes.header}>
          <div className={classes.item}>
            <img src={lockIcon} alt="" />
            <label>Membership</label>
          </div>
          <div className={classes.item}>
            <img src={heartIcon} alt="" />
            <label>Support</label>
          </div>
        </div>

        <div className={classes.center}>
          <div>
            <h2>
              <span>Buy </span>
              <span style={{ color: "#717171" }}> Creator </span>
              <span> some lucky eggs</span>
            </h2>
          </div>
          <input placeholder="Your Name" />
        </div>

        <div className={classes.footer}>
          <div className={classes.eggBox}>
            <img src={eggIcon} alt="" />
            <img src={xIcon} alt="" style={{ height: 24, margin: "0 10px" }} />
            <button>1</button>
            <button>3</button>
            <button>5</button>
            <input placeholder="0" />
          </div>
          <div className={classes.eggDetail}>
            <p>(An Egg is equal 0.001 ETH)</p>
            <p>Your donate is 0.001 ETH</p>
            <button>Support 5 eggs</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
