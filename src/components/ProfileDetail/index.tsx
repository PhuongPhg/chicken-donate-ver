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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IOrganisation } from 'types/organisation';
import { CURRENT_EGGS_LIST_SUPPORTED, PRICE_OF_EACH_EGG } from 'utils/constant';
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

  const isDisabledButton = useMemo(() => !donorName || !eggs, [donorName, eggs]);

  const handleClick = useCallback(async () => {
    try {
      if (!isDisabledButton) {
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [isDisabledButton, donorName, addressId, totalPrice]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEggs(Number(e.target.value));
  };

  const selectDonorNameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonorName(e.target.value);
  };

  const handleGetDonations = useCallback(async () => {}, [addressId]);

  const handleGetHistories = useCallback(
    async (changeTab = true) => {
      if (changeTab) {
        setRecentHistory(RecentHistoryEnum.WITHDRAWS);
      }
    },
    [addressId],
  );

  useEffect(() => {
    if (addressId) {
      handleGetDonations();
    }
  }, [handleGetDonations, addressId]);

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
            onClick={() => setRecentHistory(RecentHistoryEnum.DONOR)}>
            RECENT DONORS
          </div>
          <div
            className={clsx(classes.supported, { [classes.active]: recentHistory === RecentHistoryEnum.WITHDRAWS })}
            onClick={() => handleGetHistories(true)}>
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
            <img src={lockIcon} alt="membership" />
            <label>Membership</label>
          </div>
          <div
            className={classes.item}
            style={{ backgroundColor: 'rgba(232, 82, 128, 0.2)', color: '#E85280', cursor: 'pointer' }}>
            <img src={heartIcon} alt="support" />
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
          <input
            placeholder="Your Name"
            onChange={selectDonorNameHandle}
            className={classes.inputname}
            maxLength={50}
          />
          <textarea placeholder="say something nice" className={classes.inputmess} maxLength={300} />
          <div className={classes.eggBox}>
            <img src={eggIcon} alt="egg" />
            <img src={xIcon} alt="" style={{ height: 24, margin: '0 10px' }} />
            {CURRENT_EGGS_LIST_SUPPORTED.map(ele => (
              <button
                key={ele}
                onClick={() => handleSelectEggs(ele)}
                className={clsx({ [classes.acticeBtn]: eggs === ele })}
                style={{ color: '#e85280' }}>
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
