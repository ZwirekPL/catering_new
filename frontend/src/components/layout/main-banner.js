import React from "react";
import CateringIcon from "../../images/catering.png";

export const MainBanner = () => {
  return (
    <div className="mainBanner">
      <div className="mainBanner__logo">
        <img
          className="mainBanner__image"
          src={CateringIcon}
          alt="Catering Icon"
        />
      </div>
      <h1 className="mainBanner__h1">Witamy w Catering Manager</h1>
      <p className="mainBanner__description">
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
