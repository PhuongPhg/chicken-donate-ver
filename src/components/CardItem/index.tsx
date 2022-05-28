import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './style.module.scss';
import eggIcon from 'assets/egg-donate.svg';
import { IOrganisation } from 'types/organisation';
import { getOrganizationBalance } from 'ethereum';

function CardItem(props: IOrganisation) {
  const { description, name, photoUrl, addressId } = props;
  const [amount, setAmount] = useState<string>();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile', { state: props });
  };

  const fetchData = useCallback(async () => {
    const value = await getOrganizationBalance(addressId);
    setAmount((value || 0).toString());
  }, [addressId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          <span>{amount} ETH</span>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
