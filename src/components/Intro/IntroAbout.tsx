import React from 'react';
import classes from './style.module.scss';

function IntroAbout() {
  return (
    <div className={classes.container}>
      <div className={classes.textCenter}>
        <div className={classes.introTitle}>We hope that donation now is clearer with Chicken Donate</div>
        <div className={classes.subTitleWrapper}>
          <p className={classes.subTitle}>
            Started from May 1st with the goal to remove all the hidden corners of donation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntroAbout;
