import React from 'react';
import classes from './style.module.scss';

function IntroTerms() {
  return (
    <div className={classes.container}>
      <div className={classes.textCenter}>
        <div className={classes.introTitle}>Term of uses</div>
        <div className={classes.subTitleWrapper}>
          <p className={classes.subTitle}>
            Please read this first.
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntroTerms;
