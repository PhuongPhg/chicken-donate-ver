import React from 'react';
import classes from './style.module.scss';

function inputPage() {
    return (
        <div className={classes.inputPage}>
            <div>
                <span>Chickendonate.com/</span>
                <input type="text" placeholder='yourname' />
            </div>
            <div>
                <button className={classes.inputButton}>Start my page</button>
            </div>
        </div>
    )
}

export default inputPage;