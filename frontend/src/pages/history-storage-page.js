import { useAuth0 } from "@auth0/auth0-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper";
import React, { useEffect, useState } from "react";
import { HistoryTable } from "../components/tables/history-storage-table";
import { getInventoryHistory } from "../services/message.service";
import { PageLayout } from "../components/layout/page-layout";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import "swiper/css/navigation";

export const HistoryStoragePage = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [historyInventory, setHistoryInventory] = useState([]);
  const [selectValue, setSelectValue] = useState(`${user.name}`);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const getHistory = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getInventoryHistory(accessToken, user.name);
      if (!isMounted) {
        return;
      }
      if (user.email === "admin@test.com") {
        setAdmin(true);
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
  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  const handleClick = () => {
    const getHistoryOther = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getInventoryHistory(
        accessToken,
        selectValue
      );

      if (data) {
        setHistoryInventory(data);
      }
      if (error) {
        setHistoryInventory(error);
      }
    };
    getHistoryOther();
  };

  // console.log(historyInventory);
  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Historia Inwentaryzacji
        </h1>
        <div className="content__body">
          <p>
            <span>
              Tutaj możesz sprawdzić historię swoich inwentaryzacji. Pamiętaj,
              że po 30 dniach od zapisania zostaje ona usunięta.
            </span>
          </p>
          {admin && (
            <>
              <label className="table-select-label" htmlFor="departament">
                Wybierz placówkę:
              </label>

              <select
                name="departament"
                id="departament"
                value={selectValue}
                onChange={handleChange}
                className="button table-select-222"
              >
                <option value="user1@test.com">Użytkownik1</option>
                <option value="user2@test.com">Użytkownik2</option>
                <option value="user3@test.com">Użytkownik3</option>
                <option value="user4@test.com">Użytkownik4</option>
                <option value="user5@test.com">Użytkownik5</option>
                <option value="user6@test.com">Użytkownik6</option>
                <option value="user7@test.com">Użytkownik7</option>
                <option value="user8@test.com">Użytkownik8</option>
                <option value="user9@test.com">Użytkownik9</option>
                <option value="user10@test.com">Użytkownik10</option>
                <option value="user11@test.com">Użytkownik11</option>
                <option value="user12@test.com">Użytkownik12</option>
                <option value="user13@test.com">Użytkownik13</option>
                <option value="user14@test.com">Użytkownik14</option>
                <option value="user15@test.com">Użytkownik15</option>
              </select>
              <button
                className="button button--primary table-select-button-none"
                onClick={handleClick}
              >
                Pobierz
              </button>
            </>
          )}
          {historyInventory.length === 0 && (
            <table>
              <tbody>
                <tr>
                  <td className="container-handle-error" colSpan="6">
                    <p className="handle-error ">Nie znaleziono artykułów.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          <Swiper
            navigation={true}
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            keyboard={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination, Keyboard, Navigation]}
          >
            {historyInventory.toReversed().map((inventory, index) => (
              <SwiperSlide key={index}>
                <HistoryTable inventory={inventory} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </PageLayout>
  );
};
