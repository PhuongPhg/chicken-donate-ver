import React, { ElementType, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Topbar from 'components/Topbar';
import Footer from 'components/Footer';
import classes from './style.module.scss';
import clsx from 'clsx';
import { ClientRoutesEnum } from 'enums/routes';
import { provider } from 'ethereum';

interface ILayout {
  RenderComponent: ElementType;
}

function DefaultLayout(props: ILayout) {
  const { RenderComponent } = props;
  const location = useLocation();
  const switchNetWork = async () => {
    const { chainId } = await provider.getNetwork();
    console.log('chainId :', chainId);
    if (chainId === 3) return;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {         
            chainId: `0x${Number(3).toString(16)}`,
 
          },
        ],
      });
      window.location.reload()
    } catch {
      
    }
  };
  useEffect(() => {
    switchNetWork();
  }, []);
  return (
    <div>
      <Topbar />
      <div
        className={clsx({
          [classes.renderComponent]: location.pathname === ClientRoutesEnum.HOME,
        })}>
        <RenderComponent />
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
