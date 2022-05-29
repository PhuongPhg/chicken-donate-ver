import React, { useEffect, useMemo, useState } from 'react';
import classes from './style.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { saveOrganization } from 'service';
import { IOrganisation } from 'types/organisation';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'firestore';
import { createOrganization } from 'ethereum';
import { PRICE_FOR_CREATING_ACCOUNT } from 'utils/constant';
import background from 'assets/background.jpg';
import cameraIcon from 'assets/camera.png';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgUpload(e.target.files[0]);
      setAvatarPreveiw(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCreate = async () => {
    if (enable) {
      const res = await createOrganization(name || '');
      const avatarImagesRef = ref(storage, `images/avatar-organization/${imgUpload.name.replace(/\s+/g, '')}`);
      await uploadBytes(avatarImagesRef, imgUpload);
      const avatarUrl = await getDownloadURL(
        ref(storage, `images/avatar-organization/${imgUpload.name.replace(/\s+/g, '')}`),
      );
      await saveOrganization({
        addressId: res.from,
        name,
        briefDes: shortdes,
        description: des,
        photoUrl: avatarUrl,
        type: type,
        contractAddress: res.contractAddress,
      } as IOrganisation);
      navigate('/');
    }
  };

  useEffect(() => {
    return () => {
      if (avatarPreveiw) URL.revokeObjectURL(avatarPreveiw);
    };
  }, [avatarPreveiw]);

  return (
    <>
      <div className={classes.background}>
        <img src={background} alt="" />
      </div>
      <div style={{ padding: '0 135px' }}>
        <div className={classes.main}>
          <div className={classes.upload}>
            <label htmlFor="filechange">
              <div className={clsx(classes.camera, { [classes.unsetborder]: avatarPreveiw })}>
                {!avatarPreveiw ? (
                  <img src={cameraIcon} alt="" width={24} height={18} />
                ) : (
                  <img src={avatarPreveiw} alt="" className={classes.avatar} />
                )}
              </div>
            </label>
            <input type="file" id="filechange" style={{ display: 'none' }} onChange={handleChangeAvatar} />
          </div>
          <div className={classes.infomation}>
            <h1 className={classes.heading}>Create Organization</h1>
            <div className={classes.form}>
              <input
                id="name"
                className={classes.input}
                placeholder="Organization name"
                onChange={e => {
                  setName(e.target.value);
                }}
              />

              <input
                name="type"
                className={classes.input}
                placeholder="Youtuber"
                value={type}
                onChange={handleChange}
                list="type"
              />
              <datalist id="type">
                <option value="Artist" />
                <option value="Youtuber" />
                <option value="Charity" />
              </datalist>
            </div>
            <div className={classes.description}>
              <textarea
                id="des"
                placeholder="description, write about here"
                onChange={e => {
                  setDes(e.target.value);
                }}
              />
            </div>

            <input
              id="shortdes"
              className={classes.input}
              placeholder="brief description"
              onChange={e => {
                setShortDes(e.target.value);
              }}
            />

            <button
              className={clsx(classes.createBtn, { [classes.activeCreate]: enable })}
              onClick={handleCreate}
              disabled={!enable}>
              Create a organization with only {PRICE_FOR_CREATING_ACCOUNT} ETH
            </button>
          </div>
        </div>
      </div>
      <div className={classes.overlay}></div>
    </>
  );
}

export default Creation;
