import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./style.module.scss";
import eggIcon from "assets/egg-donate.svg";
import { IOrganisation } from "types/organisation";

function CardItem(props: IOrganisation) {
  const { description, name, photoUrl, addressId } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile", { state: props });
  };

  return (
    <div className={classes.cardWrapper} onClick={handleClick}>
      <div className={classes.avatar}>
        <img className={classes.img} src={photoUrl} alt="" />
      </div>
      <div className={classes.info}>
        <div className={classes.name}>{name}</div>
        <div className={classes.desc}>{description}</div>
        <div className={classes.egg}>
          <img src={eggIcon} alt="" className={classes.eggIcon} />
          <span>9 ETH</span>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
