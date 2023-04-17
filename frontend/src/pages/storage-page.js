import React from "react";
import { NavLink } from "react-router-dom";
import { Table } from "../components/tables/storage-table";
import { PageLayout } from "../components/layout/page-layout";

export const StoragePage = () => {
  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Magazyn
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              Tutaj możesz sprawdzić swój stan magazynowy oraz zrobić
              inwentaryzacje.
            </span>
          </p>
          <div className="history-storage">
            <NavLink
              to="/storage/history"
              end
              className="history-storage-btn button button--primary"
            >
              Przejdź do historii inwentaryzacji
            </NavLink>
          </div>
          <Table />
        </div>
      </div>
    </PageLayout>
  );
};
