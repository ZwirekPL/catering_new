import React from "react";
import { NavLink } from "react-router-dom";
import { ShoppingListTable } from "../components/shopping-list-table";
import { PageLayout } from "../components/page-layout";

export const ShoppingList = () => {
  return (
    <PageLayout>
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
              to="/storage/history"
              end
              className="shopping-list-btn button button--primary"
            >
              Przejdź do historii list zakupowych.
            </NavLink>
          </div>
          <ShoppingListTable />
        </div>
      </div>
    </PageLayout>
  );
};
