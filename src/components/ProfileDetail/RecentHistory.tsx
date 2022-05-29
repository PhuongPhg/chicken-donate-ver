import React, { useEffect, useMemo, useState } from 'react';
import classes from './style.module.scss';
import { getDonor } from 'service';
import { IDonor } from 'types/donor';
import moment from 'moment';
import { PRICE_OF_EACH_EGG } from 'utils/constant';

export interface IRecentHistory {
  donorId: string;
  amount: string;
  time: number;
}

interface IProps extends Partial<IRecentHistory> {
  isWithdrawTransaction?: boolean;
  organizationName?: string;
}
function RecentHistory(props: IProps) {
  const { amount, donorId, time, isWithdrawTransaction, organizationName } = props;
  const [donor, setDonor] = useState<IDonor>();

  useEffect(() => {
    if (!isWithdrawTransaction) {
      const fetchData = async () => {
        const res = await getDonor(donorId || '');
        setDonor(res);
      };
      fetchData();
    }
  }, [donorId, isWithdrawTransaction]);

  const displayedName = useMemo(
    () => (isWithdrawTransaction ? organizationName : donor?.name),
    [organizationName, isWithdrawTransaction, donor?.name],
  );

  const displayedEggs = useMemo(() => Math.round(Number(amount) / PRICE_OF_EACH_EGG), [amount]);
  return (
    <div className={classes.wrapper}>
      <div className={classes.dot}></div>
      <div>
        <span style={{ fontWeight: 700 }}>{displayedName}</span>
        {isWithdrawTransaction ? (
          <span>
            {' '}
            has eaten <span style={{ fontWeight: 700 }}>{displayedEggs}</span> eggs
          </span>
        ) : (
          <span>
            {' '}
            donated <span style={{ fontWeight: 700 }}>{amount}</span> ETH
          </span>
        )}

        <div>{moment.unix(time as number).toString()}</div>
      </div>
    </div>
  );
}

export default RecentHistory;
