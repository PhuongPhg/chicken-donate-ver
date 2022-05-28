import background from 'assets/background.jpg';
import { getOrganizationBalance } from 'ethereum';
import React, { useCallback, useEffect, useState } from 'react';
import { IOrganisation } from 'types/organisation';
import classes from './style.module.scss';

function Header(props: IOrganisation) {
  const { description, name, photoUrl, addressId } = props;
  const [amount, setAmount] = useState<string>();

  const fetchData = useCallback(async () => {
    const value = await getOrganizationBalance(addressId);
    setAmount((value || 0).toString());
  }, [addressId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
