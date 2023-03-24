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
