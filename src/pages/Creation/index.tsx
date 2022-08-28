import background from 'assets/background.jpg';
import cameraIcon from 'assets/camera.png';
import clsx from 'clsx';
import StyledInput from 'components/StyledInput/StyledInput';
import { createOrganization } from 'ethereum';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'firestore';
import { Field, Formik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveOrganization } from 'service';
import { ECategoryTypes, IOrganisation } from 'types/organisation';
import { CATEGORY_LIST, PRICE_FOR_CREATING_ACCOUNT } from 'utils/constant';
import * as Yup from 'yup';
import classes from './style.module.scss';

function Creation() {
  const navigate = useNavigate();
  const [avatarPreveiw, setAvatarPreveiw] = useState<string>();
  const [imgUpload, setImgUpload] = useState<any>();


  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgUpload(e.target.files[0]);
      setAvatarPreveiw(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    return () => {
      if (avatarPreveiw) URL.revokeObjectURL(avatarPreveiw);
    };
  }, [avatarPreveiw]);

  const initialValues = useMemo(
    () => ({
      addressId: '',
      slug: '',
      name: '',
      briefDes: '',
      description: '',
      type: ECategoryTypes.CHARITY,
      contractAddress: '',
      photoUrl: '',
    }),
    [],
  );

  const organizationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required('This field is required').max(20, 'Maximum characters for name is 20'),
        briefDes: Yup.string()
          .required('This field is required')
          .max(50, 'Maximum characters for brief description is 50'),
        description: Yup.string()
          .required('This field is required')
          .max(300, 'Maximum characters for description is 300'),
        photoUrl: Yup.string().required('This field is required'),
      }),
    [],
  );

  const handleOnSubmit = useCallback(
    async (values: Partial<IOrganisation>) => {
      const res = await createOrganization(values.name || '');
      const avatarImagesRef = ref(storage, `images/avatar-organization/${values?.photoUrl?.replace(/\s+/g, '')}`);
      await uploadBytes(avatarImagesRef, imgUpload);
      const avatarUrl = await getDownloadURL(
        ref(storage, `images/avatar-organization/${imgUpload.name.replace(/\s+/g, '')}`),
      );
      await saveOrganization({
        ...values,
        addressId: res.from,
        photoUrl: avatarUrl,
        contractAddress: res.contractAddress,
      } as IOrganisation);
      navigate('/');
    },
    [imgUpload, navigate],
  );

  return (
    <>
      <div className={classes.background}>
        <img src={background} alt="" />
      </div>
      <div style={{ padding: '0 135px' }}>
        <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={organizationSchema}>
          {({ handleChange, values, isValid, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div className={classes.main}>
                <div className={classes.upload}>
                  <label htmlFor="photoUrl">
                    <div
                      className={clsx(classes.camera, {
                        [classes.unsetborder]: avatarPreveiw,
                        [classes.errorAvatarBorder]: errors.photoUrl && touched,
                      })}>
                      {!avatarPreveiw ? (
                        <img src={cameraIcon} alt="" width={24} height={18} />
                      ) : (
                        <img src={avatarPreveiw} alt="" className={classes.avatar} />
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="photoUrl"
                    style={{ display: 'none' }}
                    onChange={e => {
                      handleChange(e);
                      handleChangeAvatar(e);
                    }}
                    accept="image/*"
                  />
                </div>
                <div className={classes.infomation}>
                  <h1 className={classes.heading}>Create Organization</h1>
                  <div className={classes.form}>
                    <StyledInput
                      id="name"
                      placeholder="Organization name"
                      onChange={handleChange}
                      value={values.name || ''}
                      errorMessage={touched && errors.name ? errors.name : ''}
                    />
                    <Field as="select" name="type" className={classes.input}>
                      {CATEGORY_LIST.map(({ title, value }) => (
                        <option value={value}>{title}</option>
                      ))}
                    </Field>
                  </div>
                  <div className={classes.description}>
                    <textarea
                      id="description"
                      placeholder="Description, write about here"
                      onChange={handleChange}
                      className={clsx({ [classes.errorInput]: touched && errors.description })}
                    />
                  </div>
                  {touched && errors.description && <div className={classes.errorMessageTxt}>{errors.description}</div>}

                  <StyledInput
                    id="briefDes"
                    placeholder="Brief description"
                    onChange={handleChange}
                    value={values.briefDes || ''}
                    errorMessage={touched && errors.briefDes ? errors.briefDes : ''}
                  />
                  <button
                    className={clsx(classes.createBtn, { [classes.activeCreate]: isValid })}
                    disabled={!isValid}
                    type="submit">
                    Create a organization with only {PRICE_FOR_CREATING_ACCOUNT} ETH
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className={classes.overlay}></div>
    </>
  );
}

export default Creation;
