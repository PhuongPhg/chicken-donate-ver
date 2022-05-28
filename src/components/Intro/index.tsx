import React from 'react';
import classes from './style.module.scss';

function Intro() {
  return (
    <div className={classes.container}>
      <div className={classes.textCenter}>
        <div className={classes.introTitle}>A supporter is worth a thousand followers.</div>
        <div className={classes.subTitleWrapper}>
          <p className={classes.subTitle}>
            Accept donations. Start a membership. Sell anything you like. It’s easier than you think.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Intro;
