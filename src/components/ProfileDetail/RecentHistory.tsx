import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import classes from "./style.module.scss";
import { getDonor } from "service";
import { IDonor } from "types/donor";

export interface IRecentHistory {
  donorId: string;
  time: number;
  amount: string;
}

function RecentHistory(props: IRecentHistory) {
  const { donorId, amount, time } = props;
  const [donor, setDonor] = useState<IDonor>();

  const fetchData = useCallback(async () => {
    const res = await getDonor(donorId);
    setDonor(res);
  }, [donorId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.dot}></div>
      <div>
        <span className={classes.donorName}>{`${donor?.name} `}</span>
        <span>
          donated <span className={classes.eth}>{amount}</span> ETH
        </span>
        <div>{moment.unix(time).toString()}</div>
      </div>
    </div>
  );
}

export default RecentHistory;
