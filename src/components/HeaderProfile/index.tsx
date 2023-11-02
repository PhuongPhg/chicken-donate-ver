import background from 'assets/background.jpg';
import eggIcon from 'assets/egg-donate.svg';
import shareIcon from 'assets/share.png';
import useToast, { EToastType } from 'hooks/useToast';
import { useCallback, useMemo, useState } from 'react';
import { IOrganisation } from 'types/organisation';
import classes from './style.module.scss';

function Header(props: IOrganisation) {
  const { description, name, photoUrl, addressId } = props;
  const [amount, setAmount] = useState<string>();
  const [currentSignerAddress, setCurrentSignerAddress] = useState<string>('');
  const toast = useToast();

  const isOwner = useMemo(
    () => currentSignerAddress?.toLowerCase() === addressId?.toLowerCase(),
    [addressId, currentSignerAddress],
  );

  const onWithdraw = useCallback(async () => {}, [addressId]);

  const onClickShareButton = useCallback(() => {
    try {
      navigator.clipboard.writeText(`Visit ${name} at ${window.location.href}`);
      toast('🥚 Copy text to clipboard');
    } catch (error) {
      toast('Failed to copy text', EToastType.error);
    }
  }, [name, toast]);

  return (
    <div className={classes.container}>
      <img src={background} alt="" className={classes.background} />

      <div className={classes.profileInfo}>
        <div className={classes.infoWrapper}>
          <div className={classes.avatar}>
            <img src={photoUrl} alt="" className={classes.avatarImg} />
          </div>
          <div className={classes.nameWrapper}>
            <div className={classes.title}>{name}</div>
            <div className={classes.desc}>{description}</div>
          </div>
        </div>

        <div className={classes.share}>
          <img src={eggIcon} alt="" width={24} height={24} />
          <div className={classes.curreny}>{amount} ETH</div>
          <button style={{ margin: '0 0 0 20px' }} onClick={onClickShareButton}>
            <img src={shareIcon} alt="" style={{ marginRight: 12 }} />
            <span style={{ color: 'black' }}>Share</span>
          </button>
          {isOwner && (
            <button
              style={{ backgroundColor: '#E85280', fontWeight: 600, color: 'white', marginTop: 0 }}
              onClick={onWithdraw}>
              Withdraw
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
