import React, { useEffect, useState } from 'react';
import classes from './style.module.scss';
import { getDonor } from 'service';
import { IDonor } from 'types/donor';
import moment from 'moment';

export interface IRecentHistory {
  donorId: string;
  amount: string;
  time: number;
}

function RecentHistory(props: IRecentHistory) {
  const { amount, donorId, time } = props;
  const [donor, setDonor] = useState<IDonor>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDonor(donorId);
      setDonor(res);
    };
    fetchData();
  }, [donorId]);
  return (
    <div className={classes.wrapper}>
      <div className={classes.dot}></div>
      <div>
        <span style={{ fontWeight: 700 }}>{donor?.name}</span>
        <span>
          {' '}
          donated <span style={{ fontWeight: 700 }}>{amount}</span> ETH
        </span>
        <div>{moment.unix(time).toString()}</div>
      </div>
    </div>
  );
}

export default RecentHistory;
