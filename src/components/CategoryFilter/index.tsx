import React from 'react';
import classes from './style.module.scss';

function categoryFilter() {
    return (
        <div className={classes.filterContainer}>
            <button className={classes.filterItem}>Video Creators</button>
            <button className={classes.filterItem}>Artist</button>
            <button className={classes.filterItem}>Youtuber</button>
            <button className={classes.filterItem}>Gaming</button>
            <button className={classes.filterItem}>Podcasters</button>
            <button className={classes.filterItem}>Charity</button>
        </div>
    )
}

export default categoryFilter;
