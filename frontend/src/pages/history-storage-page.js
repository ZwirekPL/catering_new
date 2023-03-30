import { useAuth0 } from "@auth0/auth0-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper";
import React, { useEffect, useState } from "react";
import { HistoryTable } from "../components/history-table";
import { getInventoryHistory } from "../services/message.service";
import { PageLayout } from "../components/page-layout";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "../styles/components/history-storage-page.css";

export const HistoryStoragePage = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [historyInventory, setHistoryInventory] = useState([]);
  const [selectValue, setSelectValue] = useState(`${user.name}`);
  const [admin, setAdmin] = useState(false);

  //Change table concept for less request to backend.

  useEffect(() => {
    let isMounted = true;
    const getHistory = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getInventoryHistory(accessToken, user.name);
      // console.log(data);
      if (!isMounted) {
        return;
      }
      if (user.email === "kamila@test.pl") {
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
    // console.log(selectValue);
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
        console.log(selectValue);
      }

      if (error) {
        setHistoryInventory(error);
      }
    };

    getHistoryOther();
    console.log(historyInventory);
  };

  console.log(historyInventory);
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
              <label htmlFor="departament">Wybierz placówkę:</label>

              <select
                name="departament"
                id="departament"
                value={selectValue}
                onChange={handleChange}
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
              <button onClick={handleClick}>Pobierz</button>
            </>
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
            {historyInventory.map((inventory, index) => (
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
