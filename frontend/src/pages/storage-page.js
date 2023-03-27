import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { Table } from "../components/table";
import { MultiTable } from "../components/multi-table";
import { PageLayout } from "../components/page-layout";

export const StoragePage = () => {
  const { user } = useAuth0();
  // console.log(process.env.MANAGER_USERNAME);
  if (user.email === "kamila@test.pl") {
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
            <MultiTable />
          </div>
        </div>
      </PageLayout>
    );
  }
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
