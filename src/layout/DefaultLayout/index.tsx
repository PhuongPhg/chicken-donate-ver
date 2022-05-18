import React, { ElementType } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "components/Topbar";
import Footer from "components/Footer";
import classes from "./style.module.scss";
import clsx from "clsx";

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
          [classes.renderComponent]: location.pathname !== "/profile",
        })}
      >
        <RenderComponent />
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
