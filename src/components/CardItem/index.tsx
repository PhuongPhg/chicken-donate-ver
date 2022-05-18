import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./style.module.scss";
import eggIcon from "assets/egg-donate.svg";

function CardItem() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div className={classes.cardWrapper} onClick={handleClick}>
      <div className={classes.avatar}>
        <img
          className={classes.img}
          src="https://pbs.twimg.com/media/E9NtT6yVIAcMSFU.jpg"
          alt=""
        />
      </div>
      <div className={classes.info}>
        <div className={classes.name}>i'm badao</div>
        <div className={classes.desc}>come here bro</div>
        <div className={classes.egg}>
          <img src={eggIcon} alt="" className={classes.eggIcon} />
          <span>9 ETH</span>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
