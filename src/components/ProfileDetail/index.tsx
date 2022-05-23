import React, { useState } from "react";
import classes from "./style.module.scss";
import heartIcon from "assets/heart.svg";
import lockIcon from "assets/lock.svg";
import eggIcon from "assets/egg-donate-box.svg";
import xIcon from "assets/x.svg";
import { IOrganisation } from "types/organisation";
import { donationForOrganization } from "ethereum";
import clsx from "clsx";

function ProfileDetail(props: IOrganisation) {
  const { description, photoUrl, addressId, name } = props;

  const [donorName, setDonorName] = useState<string>();
  const [eggs, setEggs] = useState<number>(1);

  const handleSelectEggs = (eggsCount: number) => {
    setEggs(eggsCount);
  };

  const handleClick = async () => {
    if (donorName) await donationForOrganization(eggs, addressId, donorName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEggs(Number(e.target.value));
  };

  const selectDonorNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonorName(e.target.value);
  };

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
              <span style={{ color: "#717171" }}> {name} </span>
              <span> some lucky eggs</span>
            </h2>
          </div>
          <input placeholder="Your Name" onChange={selectDonorNameHandle} />
        </div>

        <div className={classes.footer}>
          <div className={classes.eggBox}>
            <img src={eggIcon} alt="" />
            <img src={xIcon} alt="" style={{ height: 24, margin: "0 10px" }} />
            <button
              onClick={() => handleSelectEggs(1)}
              className={clsx({ [classes.acticeBtn]: eggs === 1 })}
            >
              1
            </button>
            <button
              onClick={() => handleSelectEggs(3)}
              className={clsx({ [classes.acticeBtn]: eggs === 3 })}
            >
              3
            </button>
            <button
              onClick={() => handleSelectEggs(5)}
              className={clsx({ [classes.acticeBtn]: eggs === 5 })}
            >
              5
            </button>
            <input placeholder="0" onChange={handleChange} />
          </div>
          <div className={classes.eggDetail}>
            <p>(An Egg is equal 0.001 ETH)</p>
            <p>Your donate is {eggs * 0.001} ETH</p>
            <button onClick={handleClick}>Support {eggs} eggs</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
