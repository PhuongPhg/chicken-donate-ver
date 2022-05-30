import React from 'react';
import { Link } from 'react-router-dom';
import { WEBSITE_PROFILE_DOMAIN } from 'utils/constant';
import classes from './style.module.scss';

function InputPage() {
  return (
    <div className={classes.inputPage}>
      <div>
        <span>{WEBSITE_PROFILE_DOMAIN}</span>
        <input type="text" placeholder="your-address" />
      </div>
      <div>
        <Link to="/create" className={classes.buttonWrapper}>
          <div className={classes.inputButton}>Start my page</div>
        </Link>
      </div>
    </div>
  );
}

export default InputPage;
