import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarTab } from "./nav-bar-tab";

export const NavBarTabs = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div className="nav-bar__tabs">
      <NavBarTab path="/faq" label="FAQ?" />

      {isAuthenticated &&
        user.email !== "driver1@test.com" &&
        user.email !== "driver2@test.com" &&
        user.email !== "driver3@test.com" && (
          <>
            <NavBarTab path="/storage" label="Magazyn" />
            <NavBarTab path="/shopping-list" label="Listy Zakupowe" />
          </>
        )}
      {isAuthenticated &&
        (user.email === "driver1@test.com" ||
          user.email === "driver2@test.com" ||
          user.email === "driver3@test.com") && (
          <>
            <NavBarTab path="/shopping-list" label="Listy Zakupowe" />
          </>
        )}
    </div>
  );
};
