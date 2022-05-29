import background from 'assets/background.jpg';
import { getOrganizationBalance, signer, withdraw } from 'ethereum';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IOrganisation } from 'types/organisation';
import classes from './style.module.scss';

function Header(props: IOrganisation) {
  const { description, name, photoUrl, addressId } = props;
  const [amount, setAmount] = useState<string>();
  const [currentSignerAddress, setCurrentSignerAddress] = useState<string>('');

  const fetchData = useCallback(async () => {
    const value = await getOrganizationBalance(addressId);
    setAmount((value || 0).toString());
  }, [addressId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangeAccounts = useCallback((accounts: string[]) => setCurrentSignerAddress(accounts[0]), []);

  const getSigners = async () => {
    const connectedAddress = await signer.getAddress();
    setCurrentSignerAddress(connectedAddress);
  };

  useEffect(() => {
    const { ethereum } = window;
    ethereum.on('accountsChanged', handleChangeAccounts);
    return () => ethereum.removeListener('accountsChanged', handleChangeAccounts);
  }, [handleChangeAccounts]);

  useEffect(() => {
    getSigners();
  }, []);

  const isOwner = useMemo(
    () => currentSignerAddress?.toLowerCase() === addressId?.toLowerCase(),
    [addressId, currentSignerAddress],
  );

  const onWithdraw = useCallback(async () => {
    await withdraw(addressId);
  }, [addressId]);

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
        <div>
          <button>Share</button>
          {isOwner && <button onClick={onWithdraw}>Withdraw</button>}
        </div>
      </div>
    </div>
  );
}

export default Header;
