import React from 'react';
import classes from './style.module.scss';
import image1 from 'assets/image_10.png';
import image2 from 'assets/image_11.png';
import clsx from 'clsx';

function Intro() {
  return (
    <div style={{ marginTop: 100 }}>
      <div className={clsx(classes.container, classes.bottomIntro, classes.bg1)}>
        <div className={classes.textCenter}>
          <div className={classes.topTitle}>DONATIONS</div>
          <div className={classes.introTitle}>Give your audience an easy way to say thanks.</div>
          <div className={classes.subTitleWrapper}>
            <p className={classes.subTitle}>
              Chicken donate makes supporting fun and easy. In just a couple of taps, your fans can make the payment (buy you a coffee) and leave a message. They don’t even have to create an account!
            </p>
          </div>
          <div>
            <img src={image1} alt="" />
          </div>
        </div>
      </div>
      <div className={clsx(classes.container, classes.bottomIntro, classes.bg2)}>
        <div className={classes.textCenter}>
          <div className={classes.topTitle}>MEMBERSHIPS</div>
          <div className={classes.introTitle}>Monthly membership for your biggest fans.</div>
          <div className={classes.subTitleWrapper}>
            <p className={classes.subTitle}>
              Earn a recurring income by accepting monthly or yearly membership. Share exclusive content, or just give them a way to support your work on an ongoing basis.
            </p>
          </div>
          <div>
            <img src={image2} alt="" />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Intro;
