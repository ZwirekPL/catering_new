import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarTab } from "./nav-bar-tab";

export const NavBarTabs = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div className="nav-bar__tabs">
      <NavBarTab path="/faq" label="FAQ?" />
      <NavBarTab path="/profile" label="Profile" />

      {isAuthenticated &&
        user.email !== "kierowca1@test.pl" &&
        user.email !== "kierowca2@test.pl" &&
        user.email !== "kierowca3@test.pl" && (
          <>
            <NavBarTab path="/storage" label="Magazyn" />
            <NavBarTab path="/shopping-list" label="Listy Zakupowe" />
          </>
        )}
      {isAuthenticated &&
        (user.email === "kierowca1@test.pl" ||
          user.email === "kierowca2@test.pl" ||
          user.email === "kierowca3@test.pl") && (
          <>
            <NavBarTab path="/shopping-list" label="Listy Zakupowe" />
          </>
        )}
    </div>
  );
};
