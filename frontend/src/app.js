import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";
import { ShoppingList } from "./pages/shopping-list";
import { HistoryShoppingList } from "./pages/history-shopping-list";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";
import { StoragePage } from "./pages/storage-page";
import { HistoryStoragePage } from "./pages/history-storage-page.js";
import { PublicPage } from "./pages/public-page";

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
      <Route
        path="/profile"
        element={<AuthenticationGuard component={ProfilePage} />}
      />
      <Route path="/public" element={<PublicPage />} />
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
// Animacje do modali,
// Sprawdzenie czy sprawdza autoryzację podczas dodawnaia do bazy danych.
// Sprawdzić jak wyglada wylogowywanie i wylogowywać po opuszczeniu strony,
// Dodać wybieranie która placówka ma się wyświetlać.
// Zacząć czyścić.
// Porównanie czy kamila to kamila ( stockowane w ENV.) i na backend i frontend
// Obsługa kamili po stronie frontu + backend
// Usunięcie zarejestruj ze zwykłej wersji, tylko u Kamili.
// U Kamili : wybieranie placówki do listy i historii
// Kto zmienił ostatni zapisać w DB tak aby można było pobrać zmiany też u innych.
// Kierowcy dostęp tylko do list zakupowych placówek i głównej.
// Media Queries
// obsługa odebrania lub wysłania danych na serwer.
// podział na kategorie.
// Dodać konta i obsługę kierowców.
