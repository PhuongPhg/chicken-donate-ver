import React from "react";
import logo from "assets/Logo.svg";
import classes from "./style.module.scss";
import { Link } from "react-router-dom";

function Topbar() {
  return (
    <div className={classes.container}>
      <img src={logo} alt="" className={classes.logo} />
      <Link to="/" className={classes.link}>
        <div className={classes.home}>Home</div>
      </Link>
      <div>Do not be a chicken !!!</div>
    </div>
  );
}

export default Topbar;
