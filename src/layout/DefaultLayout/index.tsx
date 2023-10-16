import clsx from 'clsx';
import Footer from 'components/Footer';
import Topbar from 'components/Topbar';
import { ClientRoutesEnum } from 'enums/routes';
import { ElementType } from 'react';
import { useLocation } from 'react-router-dom';
import classes from './style.module.scss';

interface ILayout {
  RenderComponent: ElementType;
}

function DefaultLayout(props: ILayout) {
  const { RenderComponent } = props;
  const location = useLocation();

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
