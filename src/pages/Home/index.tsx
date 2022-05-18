import React from "react";
import classes from "./style.module.scss";
import Intro from "components/Intro";
import CardItem from "components/CardItem";

function Home() {
  return (
    <div>
      <Intro />
      <div className={classes.cardListWrapper}>
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </div>
    </div>
  );
}

export default Home;
