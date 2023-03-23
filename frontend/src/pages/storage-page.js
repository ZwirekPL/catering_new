import React from "react";
import { Table } from "../components/table";
import { PageLayout } from "../components/page-layout";

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
          <Table />
        </div>
      </div>
    </PageLayout>
  );
};
