import React, { useState, useEffect } from "react";
import classes from "./style.module.scss";
import background from "assets/background.jpg";
import { IOrganisation } from "types/organisation";
import { getBalanceOfOrganisation } from "ethereum";

function Header(props: IOrganisation) {
  const { description, name, photoUrl, addressId } = props;
  const [amount, setAmount] = useState<string>();
  const fetchData = async () => {
    const balance = await getBalanceOfOrganisation(addressId);
    setAmount(balance);
  };

  useEffect(() => {
    fetchData().catch(() => setAmount(undefined));
  }, []);
  return (
    <div className={classes.container}>
      <img src={background} alt="" className={classes.background} />

      <div className={classes.profileInfo}>
        <div className={classes.avatar}>
          <img src={photoUrl} alt="" className={classes.avatarImg} />
        </div>
        <div className={classes.title}>{name}</div>
        <div className={classes.desc}>{description}</div>
        <div className={classes.curreny}>{amount} ETH</div>
      </div>
    </div>
  );
}

export default Header;
