import React from 'react'
import classes from './style.module.scss'

interface IRecentHistory{
  name:string;
  text: string;
  amount: string;
  time: string;
}

function RecentHistory() {
  return (
    <div className={classes.wrapper}>
        <div className={classes.dot} ></div>
        <div>
            <span>ahuhu</span>
            <span> donated 3eggs</span>
            <div>
                2020-6-7 20:00
            </div>
        </div>
    </div>
    
  )
}

export default RecentHistory