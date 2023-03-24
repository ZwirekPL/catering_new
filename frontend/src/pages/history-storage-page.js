import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { HistoryTable } from "../components/history-table";
import { getInventoryHistory } from "../services/message.service";
import { PageLayout } from "../components/page-layout";

export const HistoryStoragePage = () => {
  const [historyInventory, setHistoryInventory] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    let isMounted = true;
    const getHistory = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getInventoryHistory(accessToken, user);
      // console.log(user);
      if (!isMounted) {
        return;
      }
      if (data) {
        setHistoryInventory(data);
      }
      if (error) {
        setHistoryInventory(error);
      }
    };
    getHistory();
    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, user]);
  console.log(historyInventory);

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Historia Inwentaryzacji
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              Tutaj możesz sprawdzić historię swoich inwentaryzacji. Pamiętaj,
              że po 30 dniach od zapisania zostaje ona usunięta.
            </span>
          </p>
          {historyInventory.map((inventory, index) => (
            <HistoryTable inventory={inventory} />
          ))}
          {/* <HistoryTable /> */}
        </div>
      </div>
    </PageLayout>
  );
};
