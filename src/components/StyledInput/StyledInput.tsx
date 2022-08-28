import clsx from 'clsx';
import React from 'react';
import classes from './style.module.scss';

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  placeholder?: string;
  maxLength?: number;
  value: string | number;
  errorMessage?: string;
}

export default function StyledInput({ onChange, id, placeholder, maxLength, value, errorMessage }: IProps) {
  return (
    <div className={classes.container}>
      <input
        id={id}
        className={clsx(classes.input, {[classes.errorInput]: !!errorMessage})}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {maxLength && (
        <span className={classes.maxLengthContainer}>
          {(value + '')?.length || 0} / {maxLength}
        </span>
      )}
      {!!errorMessage && <div className={classes.errorMessageTxt}>{errorMessage}</div>}
    </div>
  );
}
