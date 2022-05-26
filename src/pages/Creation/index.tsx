import React, { useEffect, useMemo, useState } from "react";
import classes from "./style.module.scss";
import avatarDefault from "assets/avatar.webp";
import backIcon from "assets/back-icon.svg";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { saveOrganization } from "service";
import { IOrganisation } from "types/organisation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "firestore";

function Creation() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>();
  const [type, setType] = useState<string>();
  const [des, setDes] = useState<string>();
  const [shortdes, setShortDes] = useState<string>();
  const [avatarPreveiw, setAvatarPreveiw] = useState<string>();
  const [imgUpload, setImgUpload] = useState<any>();

  const enable = useMemo(() => {
    const organisationInfo = {
      description: des,
      name,
      type,
      photoUrl: avatarPreveiw,
      briefDes: shortdes,
    };
    return Object.values(organisationInfo).every(ele => ele);
  }, [des, name, type, avatarPreveiw, shortdes]);

  const hanldeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgUpload(e.target.files[0]);
      setAvatarPreveiw(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCreate = async () => {
    if (enable) {
      const avatarImagesRef = ref(
        storage,
        `images/avatar-organization/${imgUpload.name.replace(/\s+/g, "")}`
      );
      await uploadBytes(avatarImagesRef, imgUpload);
      const avatarUrl = await getDownloadURL(
        ref(
          storage,
          `images/avatar-organization/${imgUpload.name.replace(/\s+/g, "")}`
        )
      );
      await saveOrganization({
        addressId: "damgiaxi",
        name,
        briefDes: shortdes,
        description: des,
        photoUrl: avatarUrl,
        type: type,
      } as IOrganisation);
      navigate("/");
    }
  };

  useEffect(() => {
    return () => {
      if (avatarPreveiw) URL.revokeObjectURL(avatarPreveiw);
    };
  }, [avatarPreveiw]);

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
            <input
              id="name"
              className={classes.input}
              placeholder="name"
              onChange={e => {
                setName(e.target.value);
              }}
            />
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
            <textarea
              id="des"
              placeholder="Write about you here"
              onChange={e => {
                setDes(e.target.value);
              }}
            />
          </div>
          <div className={classes.item}>
            <label htmlFor="shortdes" className={classes.label}>
              Short description
            </label>
            <input
              id="shortdes"
              className={classes.input}
              placeholder="brief description"
              onChange={e => {
                setShortDes(e.target.value);
              }}
            />
          </div>

          <button
            className={classes.createBtn}
            onClick={handleCreate}
            disabled={!enable}
          >
            Create a organization with only 1 ETH
          </button>
        </div>
        <div className={classes.upload}>
          <img src={avatarPreveiw || avatarDefault} alt="" />
          <input
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleChangeAvatar}
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
