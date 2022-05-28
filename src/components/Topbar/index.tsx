import React from 'react';
import logo from 'assets/Logo.svg';
import classes from './style.module.scss';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface ITopBar {
  className?: string;
}

function Topbar(props: ITopBar) {
  const { className } = props;
  return (
    <div className={clsx(classes.container, className)}>
      <img src={logo} alt="" className={classes.logo} />
      <Link to="/" className={classes.link}>
        <div className={classes.home}>Home</div>
      </Link>
      <div>Do not be a chicken !!!</div>
      <Link to="/create" className={classes.linkCreate}>
        <div className={classes.creatorBtn}>Become a creator</div>
      </Link>
    </div>
  );
}

export default Topbar;
