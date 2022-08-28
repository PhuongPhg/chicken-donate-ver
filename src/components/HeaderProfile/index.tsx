import React, { useCallback, useEffect, useMemo, useState } from 'react';
import background from 'assets/background.jpg';
import { getOrganizationBalance, signer, withdraw } from 'ethereum';
import { IOrganisation } from 'types/organisation';
import classes from './style.module.scss';
import eggIcon from 'assets/egg-donate.svg';
import shareIcon from 'assets/share.png';
import { useContractEventListener } from 'hooks/useContractEventListener';

function Header(props: IOrganisation) {
  const { description, name, photoUrl, addressId } = props;
  const [amount, setAmount] = useState<string>();
  const [currentSignerAddress, setCurrentSignerAddress] = useState<string>('');

  const fetchData = useCallback(async () => {
    const value = await getOrganizationBalance(addressId);
    setAmount((value || 0).toString());
  }, [addressId]);

  useEffect(() => {
    if (addressId) {
      fetchData();
    }
  }, [fetchData, addressId]);

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

  useContractEventListener(addressId, fetchData, fetchData);

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
        <div className={classes.infoWrapper}>
          <div className={classes.avatar}>
            <img src={photoUrl} alt="" className={classes.avatarImg} />
          </div>
          <div className={classes.nameWrapper}>
            <div className={classes.title}>{name}</div>
            <div className={classes.desc}>{description}</div>
          </div>
        </div>

        <div className={classes.share}>
          <img src={eggIcon} alt="" width={24} height={24} />
          <div className={classes.curreny}>{amount} ETH</div>
          <button style={{ margin: '0 0 0 20px'}}>
            <img src={shareIcon} alt="" style={{ marginRight: 12 }} />
            <span style={{ color: 'black' }}>Share</span>
          </button>
          {isOwner && (
            <button style={{ backgroundColor: '#E85280', fontWeight: 600, color: 'white' }} onClick={onWithdraw}>
              Withdraw
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
