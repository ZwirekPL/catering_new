import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/layout/page-loader";
import { AuthenticationGuard } from "./components/auth/authentication-guard";
import { ShoppingList } from "./pages/shopping-list";
import { HistoryShoppingList } from "./pages/history-shopping-list";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { StoragePage } from "./pages/storage-page";
import { HistoryStoragePage } from "./pages/history-storage-page.js";
import { FAQ } from "./pages/faq.js";

export const App = () => {
  const { isLoading, logout } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
  // let currently = sessionStorage.getItem("currently");
  // if (!currently) {
  //   logout({
  //     logoutParams: {
  //       returnTo: window.location.origin,
  //     },
  //   });
  //   sessionStorage.setItem("currently", "none");
  // }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/faq" element={<FAQ />} />
      <Route
        path="/storage"
        element={<AuthenticationGuard component={StoragePage} />}
      />
      <Route
        path="/storage/history"
        element={<AuthenticationGuard component={HistoryStoragePage} />}
      />
      <Route
        path="/shopping-list"
        element={<AuthenticationGuard component={ShoppingList} />}
      />
      <Route
        path="/shopping-list/history"
        element={<AuthenticationGuard component={HistoryShoppingList} />}
      />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
// Sprawdzenie czy sprawdza autoryzację podczas dodawnaia do bazy danych.
// Zacząć czyścić.
// Media Queries??

// status zamowienia na liscie zakupowej.
// dodać obsługę historii zamówień i list zakupowych historię.
// obsługa braku wyników ?? wyrzuca bledy w konsoli
// srpawdzić czy wszystko działa.
// ostylować kierowców bo cos sie rozjechało

// obsługa jak nie masz jeszcze nic w bazach danych.!!
// obsługa odebrania lub wysłania danych na serwer.

// Edytowanie statusu tylko przez kierowców i kamilę.
// Dodać obsługę kierowców.
//zrobic główna listę zakupową.
// Kierowcy dostęp tylko do list zakupowych głównej.
// dodaje wszystkie elementy do listy itemów shooping ale jeśli sie powtarza id wysakuje błąd
// sprawić tak aby wyszukiwało rekord i dodawało liczbę aby sie nie powtarzały.
// dodaje wszystkie ale jak wyjdzie błąd wysypuje sie i nie zapisuje.
// Przeszukiwanie tych list po malych literach aby dodać do siebie ilosci.
//pozmieniac w driverlist aby edytowało i usuwało bezposrednio w DB.
