import React, { useState } from "react";
import classes from "./style.module.scss";
import avatarDefault from "assets/avatar.webp";
import backIcon from "assets/back-icon.svg";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

function Creation() {
  const navigate = useNavigate();
  const [type, setType] = useState<string>();

  const hanldeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={classes.main}>
        <div className={classes.infomation}>
          <div className={classes.back}>
            <h1>Create Organization</h1>
            <div className={classes.backIcon} onClick={handleBack}>
              <img src={backIcon} alt=""></img>
            </div>
          </div>
          <div className={classes.item}>
            <label htmlFor="name" className={classes.label}>
              Organization name
            </label>
            <input id="name" className={classes.input} placeholder="name" />
          </div>
          <div className={classes.item}>
            <label htmlFor="type" className={classes.label}>
              Type
            </label>
            <input
              name="type"
              className={classes.input}
              placeholder="Youtuber"
              value={type}
              onChange={handleChange}
            />
            <select
              id="type"
              className={clsx(classes.input, classes.select)}
              onChange={hanldeSelect}
            >
              <option>Youtuber</option>
              <option>Artist</option>
              <option>Charity</option>
            </select>
          </div>
          <div className={classes.description}>
            <label htmlFor="des" className={classes.label}>
              Description
            </label>
            <textarea id="des" placeholder="Write about you here" />
          </div>
          <div className={classes.item}>
            <label htmlFor="shortdes" className={classes.label}>
              Short description
            </label>
            <input
              id="shortdes"
              className={classes.input}
              placeholder="brief description"
            />
          </div>

          <button className={classes.createBtn}>
            Create a organization with only 1 ETH
          </button>
        </div>
        <div className={classes.upload}>
          <img src={avatarDefault} alt="" />
          <input
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
          />
          <label htmlFor="file" className={classes.uploadLabel}>
            upload your avatar
          </label>
        </div>
      </div>
      <div className={classes.overlay}></div>
    </>
  );
}

export default Creation;
