import { useAuth0 } from "@auth0/auth0-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper";
import React, { useEffect, useState } from "react";
import { HistoryList } from "../components/history-list";
import { getShoppingListHistory } from "../services/message.service";
import { PageLayout } from "../components/page-layout";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "../styles/components/history-storage-page.css";

export const HistoryShoppingList = () => {
  const [historyShoppingList, setHistoryShoppingList] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    let isMounted = true;
    const getHistory = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getShoppingListHistory(accessToken, user);
      // console.log(user);
      if (!isMounted) {
        return;
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
  //   console.log(historyInventory);

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
            {historyShoppingList.map((inventory, index) => (
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
