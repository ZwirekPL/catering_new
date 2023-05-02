import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { ShoppingListTable } from "../components/tables/shopping-list-table";
import { ShoppingListTableDrivers } from "../components/tables/driver-shopping-list-table.js";
import { PageLayout } from "../components/layout/page-layout";

export const ShoppingList = () => {
  const { user } = useAuth0();
  return (
    <PageLayout>
      {user.email !== "driver1@test.com" &&
        user.email !== "driver2@test.com" &&
        user.email !== "driver3@test.com" && (
          <div className="content-layout">
            <h1 id="page-title" className="content__title">
              Listy Zakupowe
            </h1>
            <div className="content__body">
              <p id="page-description">
                <span>Tutaj możesz utworzyć listę zakupową.</span>
              </p>
              <div className="shopping-list">
                <NavLink
                  to="/shopping-list/history"
                  end
                  className="shopping-list-btn button button--primary"
                >
                  Przejdź do historii list zakupowych.
                </NavLink>
              </div>
              <ShoppingListTable />
            </div>
          </div>
        )}
      {(user.email === "driver1@test.com" ||
        user.email === "driver2@test.com" ||
        user.email === "driver3@test.com") && (
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Listy Zakupowe
          </h1>
          <div className="content__body">
            <p id="page-description">
              <span>Tutaj możesz utworzyć listę zakupową.</span>
            </p>
            <ShoppingListTableDrivers />
          </div>
        </div>
      )}
    </PageLayout>
  );
};
