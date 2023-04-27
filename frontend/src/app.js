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
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
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

// Media Queries??
// Zacząć czyścić.
// sprawdzić czy da sie przewijać faq
// Sprawdzenie czy sprawdza autoryzację podczas dodawnaia do bazy danych.
//zmienić wszystkie px na rem
// zmienić nazwy klas na bem
// przejrzeć kod.
// sprawdzić css pod kontem nieużywanego kodu.

// pierwsze dodanie i kazde nastepne moze zmienic wszystko procz nazwy.
// dodatkowe konto kierowcow dla kamili + dodatkwoe konto dla stardomsiej

//jesli admin doda cos do listy zakupowej i ja potwierdzi to widać do na ostatniej liscie zakupowej ale nie ma tego w ostatniej liscie zakupowej wysyłanej przez danego użytkownika.
// jak nie ma listy zakupowej w DB z danej kategorii to wrzuca z innej kategorii i przy przesłaniu dodaje się ona nad tym co widzimy.
// zrobic mq dla reszty co sie nie zgadza.
