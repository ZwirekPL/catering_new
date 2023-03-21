import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../images/Logo/logo_transparent.png";

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src={Logo}
          alt="Catering Manager Logo"
          width="200"
          height="36"
        />
      </NavLink>
    </div>
  );
};
