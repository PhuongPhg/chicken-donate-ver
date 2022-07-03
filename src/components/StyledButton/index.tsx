import { useCallback } from 'react';
import classes from './style.module.scss';

interface IProps {
  title: string
  disabled?: boolean;
  onClick: () => void;
  onDisabledClick?: () => void;
}
export default function StyledButton({title, disabled, onClick, onDisabledClick}: IProps) {

  const handleClick = useCallback(
    () => {
      if(disabled && onDisabledClick){
        onDisabledClick()
      } else {
        onClick()

      }
    },
    [disabled, onClick, onDisabledClick],
  )
  
  return (
    <button className={disabled ? classes.disabledButton : ''} onClick={handleClick} disabled={disabled && !onDisabledClick}>{title}</button>
  );
}

