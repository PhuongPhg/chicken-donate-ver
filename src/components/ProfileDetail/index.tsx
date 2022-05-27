import eggIcon from "assets/egg-donate-box.svg";
import heartIcon from "assets/heart.svg";
import lockIcon from "assets/lock.svg";
import xIcon from "assets/x.svg";
import clsx from "clsx";
import { donate, signer } from "ethereum";
import React, { useMemo, useState } from "react";
import { saveDonor } from "service";
import { IOrganisation } from "types/organisation";
import { PRICE_OF_EACH_EGG } from "utils/constant";
import classes from "./style.module.scss";

function ProfileDetail(props: IOrganisation) {
  const { description, photoUrl, name, addressId } = props;

  const [donorName, setDonorName] = useState<string>();
  const [eggs, setEggs] = useState<number>(1);
  // const [donations, setDonations] = useState([]);

  const handleSelectEggs = (eggsCount: number) => {
    setEggs(eggsCount);
  };

  const totalPrice = useMemo(() =>  eggs * PRICE_OF_EACH_EGG, [eggs]);

  const handleClick = async () => {
    if (donorName) {
      const addressWallet = await signer.getAddress();
      await saveDonor({ name: donorName, address: addressWallet });
      const res = await donate(addressId, totalPrice);
      console.log("res", res); 
      // TODO: save transaction to firebase 
      // handleGetDonations()
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEggs(Number(e.target.value));
  };

  const selectDonorNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonorName(e.target.value);
  };

  // const handleGetDonations = useCallback(
  //   async () => {
  //     const res = await getDonations(addressId)
  //   },
  //   [addressId],
  // )
  
  // useEffect(() => {
  //   handleGetDonations()
  // }, [handleGetDonations])
  
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.donorBox}>
          <img src={photoUrl} alt="" className={classes.img}></img>
          <div className={classes.detail}>
            <p className={classes.text}>{description}</p>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className={classes.supported}>RECENT DONORS</div>
          <div className={classes.supported}>RECENT WITHDRAW</div>
        </div>
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
            <p>(An Egg is equal {PRICE_OF_EACH_EGG} ETH)</p>
            <p>Your donate is {totalPrice} ETH</p>
            <button onClick={handleClick}>Support {eggs} eggs</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
