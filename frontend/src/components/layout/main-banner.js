import React from "react";
import CateringIcon from "../../images/catering.png";

export const MainBanner = () => {
  return (
    <div className="main-banner main-banner--yellow-mandarine">
      <div className="main-banner__logo">
        <img
          className="main-banner__image"
          src={CateringIcon}
          alt="Catering Icon"
        />
      </div>
      <h1 className="main-banner__headline">Witamy w Catering Manager</h1>
      <p className="main-banner__description">
        Ta aplikacja pomoże Ci utrzymać aktualny stan magazynu. Jednocześnie
        ułatwi i przyspieszy tworzenie list zakupowych.
      </p>
      <a
        href="https://www.flaticon.com/free-icons/catering"
        title="catering icons"
      >
        Catering icons created by Freepik - Flaticon
      </a>
    </div>
  );
};
