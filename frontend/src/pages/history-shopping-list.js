import { useAuth0 } from "@auth0/auth0-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper";
import React, { useEffect, useState } from "react";
import { HistoryList } from "../components/tables/history-list-table";
import { getShoppingListHistory } from "../services/message.service";
import { PageLayout } from "../components/layout/page-layout";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import "swiper/css/navigation";

export const HistoryShoppingList = () => {
  const [historyShoppingList, setHistoryShoppingList] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();
  const [selectValue, setSelectValue] = useState(`${user.name}`);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const getHistory = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getShoppingListHistory(
        accessToken,
        user.name
      );
      if (!isMounted) {
        return;
      }
      if (user.email === "kamila@test.pl") {
        setAdmin(true);
      }
      if (data) {
        setHistoryShoppingList(data);
      }
      if (error) {
        setHistoryShoppingList(error);
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
    const getHistoryOtherShoppingList = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getShoppingListHistory(
        accessToken,
        selectValue
      );
      if (data) {
        setHistoryShoppingList(data);
      }
      if (error) {
        setHistoryShoppingList(error);
      }
    };
    getHistoryOtherShoppingList();
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Historia Zakupów.
        </h1>
        <div className="content__body">
          <p>
            <span>
              Tutaj możesz sprawdzić historię swoich zakupów. Pamiętaj, że po 30
              dniach od zapisania zostaje ona usunięta.
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
                <option value="izbicka">izbicka</option>
                <option value="kamila@test.pl">stradomska</option>
                {/* <option value="stradomska">stradomska</option> */}
                <option value="dietyojca@gmail.com">białowieska</option>
                {/* <option value="białowieska">białowieska</option> */}
                <option value="glanzgarage@gmail.com">korytnicka</option>
                {/* <option value="korytnicka">korytnicka</option> */}
                <option value="terespolska">terespolska</option>
                <option value="tamka">tamka</option>
                <option value="broniewskiego">broniewskiego</option>
                <option value="szeligowska">szeligowska</option>
                <option value="chłapowskiego">chłapowskiego</option>
                <option value="aleja ken">aleja KEN</option>
                <option value="samochodowa1">Samochodowa U1</option>
                <option value="samochodowa2">Samochodowa U3</option>
                <option value="bobrowiecka">bobrowiecka</option>
                <option value="rekrucka1">rekrucka Żłobek</option>
                <option value="rekrucka2">rekrucka Przedszkole</option>
              </select>
              <button
                className="button button--primary table-select-button-none"
                onClick={handleClick}
              >
                Pobierz
              </button>
            </>
          )}
          {historyShoppingList.length === 0 && (
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
            {historyShoppingList.toReversed().map((inventory, index) => (
              <SwiperSlide key={index}>
                <HistoryList inventory={inventory} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </PageLayout>
  );
};
