import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../images/Logo/logo_transparent.png";

export const MobileNavBarBrand = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className="mobile-nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src={Logo}
          alt="Catering Manager Logo"
          width="150"
          height="36"
        />
      </NavLink>
    </div>
  );
};
