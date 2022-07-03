import eggIcon from 'assets/egg-donate-box.svg';
import facebookIcon from 'assets/facebook.png';
import heartIcon from 'assets/heart.svg';
import instaIcon from 'assets/insta.png';
import lockIcon from 'assets/lock.svg';
import tiktokIcon from 'assets/toptop.png';
import twitterIcon from 'assets/twitter.png';
import xIcon from 'assets/x.svg';
import clsx from 'clsx';
import StyledButton from 'components/StyledButton';
import { donate, getDonations, getWithdrawTransaction, signer } from 'ethereum';
import { useContractEventListener } from 'hooks/useContractEventListener';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { saveDonor } from 'service';
import { IOrganisation } from 'types/organisation';
import { PRICE_OF_EACH_EGG } from 'utils/constant';
import RecentHistory, { IRecentHistory } from './RecentHistory';
import classes from './style.module.scss';

enum RecentHistoryEnum {
  DONOR = 'DONOR',
  WITHDRAWS = 'WITHDRAWS',
}

function ProfileDetail(props: IOrganisation) {
  const { description, photoUrl, name, addressId } = props;

  const [donorName, setDonorName] = useState<string>('');
  const [eggs, setEggs] = useState<number>(1);
  const [donations, setDonations] = useState<IRecentHistory[]>([]);
  const [recentHistory, setRecentHistory] = useState<RecentHistoryEnum>(RecentHistoryEnum.DONOR);
  const [withdrawTransactions, setWithdrawTransactions] = useState<Partial<IRecentHistory>[]>([]);

  const handleSelectEggs = (eggsCount: number) => {
    setEggs(eggsCount);
  };

  const totalPrice = useMemo(() => eggs * PRICE_OF_EACH_EGG, [eggs]);

  const isDisabledButton = useMemo(() => !donorName || !eggs, [donorName, eggs])

  const handleClick = useCallback(
    async () => {
      if (isDisabledButton) {
        const addressWallet = await signer.getAddress();
        await saveDonor({ name: donorName, address: addressWallet });
        await donate(addressId, totalPrice);
      }
    },
    [isDisabledButton, donorName, addressId, totalPrice],
  )
  ;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEggs(Number(e.target.value));
  };

  const selectDonorNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonorName(e.target.value);
  };

  const handleGetDonations = useCallback(async () => {
    const res = await getDonations(addressId);
    setDonations(res);
  }, [addressId]);

  const handleGetHistories = useCallback(
    async (changeTab = true) => {
      const res = (await getWithdrawTransaction(addressId)) as Partial<IRecentHistory>[];
      setWithdrawTransactions(res);
      if (changeTab) {
        setRecentHistory(RecentHistoryEnum.WITHDRAWS);
      }
    },
    [addressId],
  );

  useEffect(() => {
    handleGetDonations();
  }, [handleGetDonations]);

  useContractEventListener(addressId, handleGetDonations, () => handleGetHistories(false));

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.donorBox}>
          <img src={photoUrl} alt="" className={classes.img}></img>
          <div className={classes.detail}>
            <p className={classes.text}>{description}</p>
          </div>
          <div className={classes.media}>
            <p>My social media</p>
            <img src={twitterIcon} alt="" />
            <img src={facebookIcon} alt="" />
            <img src={instaIcon} alt="" />
            <img src={tiktokIcon} alt="" />
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div
            className={clsx(classes.supported, { [classes.active]: recentHistory === RecentHistoryEnum.DONOR })}
            onClick={() => setRecentHistory(RecentHistoryEnum.DONOR)}
          >
            RECENT DONORS
          </div>
          <div
            className={clsx(classes.supported, { [classes.active]: recentHistory === RecentHistoryEnum.WITHDRAWS })}
            onClick={() => handleGetHistories(true)}
          >
            RECENT WITHDRAW
          </div>
        </div>
        {(recentHistory === RecentHistoryEnum.WITHDRAWS ? withdrawTransactions : donations)?.map((donation, i) => (
          <RecentHistory
            key={i}
            {...donation}
            isWithdrawTransaction={recentHistory === RecentHistoryEnum.WITHDRAWS}
            organizationName={name}
          />
        ))}
      </div>
      <div className={classes.donate}>
        <div className={classes.header}>
          <div className={classes.item}>
            <img src={lockIcon} alt="" />
            <label>Membership</label>
          </div>
          <div className={classes.item} style={{ backgroundColor: 'rgba(232, 82, 128, 0.2)', color: '#E85280' }}>
            <img src={heartIcon} alt="" />
            <label>Support</label>
          </div>
        </div>

        <div className={classes.center}>
          <div>
            <h2>
              <span>Buy </span>
              <span style={{ color: '#717171' }}> {name} </span>
              <span> some lucky eggs</span>
            </h2>
          </div>
        </div>

        <div className={classes.footer}>
          <input placeholder="Your Name" onChange={selectDonorNameHandle} className={classes.inputname} />
          <textarea placeholder="say somthing nice" className={classes.inputmess} />
          <div className={classes.eggBox}>
            <img src={eggIcon} alt="" />
            <img src={xIcon} alt="" style={{ height: 24, margin: '0 10px' }} />
            {[1, 2, 3, 4, 5].map(ele => (
              <button
                key={ele}
                onClick={() => handleSelectEggs(ele)}
                className={clsx({ [classes.acticeBtn]: eggs === ele })}
              >
                {ele}
              </button>
            ))}
            <input placeholder="some eggs" onChange={handleChange} className={classes.inputegg} />
          </div>
          <div className={classes.eggDetail}>
            <p>
              An Egg is equal {PRICE_OF_EACH_EGG} ETH (Your donate is {totalPrice.toFixed(4)} ETH)
            </p>
            <StyledButton title={`Support ${eggs} eggs`} disabled={isDisabledButton} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
