import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { MobileNavBarTab } from "./mobile-nav-bar-tab";

export const MobileNavBarTabs = ({ handleClick }) => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div className="mobile-nav-bar__tabs">
      <MobileNavBarTab path="/faq" label="FAQ?" />
      {isAuthenticated &&
        user.email !== "driver1@test.pl" &&
        user.email !== "driver2@test.pl" &&
        user.email !== "driver3@test.pl" && (
          <>
            <MobileNavBarTab path="/storage" label="Magazyn" />
            <MobileNavBarTab path="/shopping-list" label="Listy Zakupowe" />
          </>
        )}
      {isAuthenticated &&
        (user.email === "driver1@test.pl" ||
          user.email === "driver2@test.pl" ||
          user.email === "driver3@test.pl") && (
          <>
            <MobileNavBarTab path="/shopping-list" label="Listy Zakupowe" />
          </>
        )}
    </div>
  );
};
