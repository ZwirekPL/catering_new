import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const AddProductModal = ({ setShowLoginModal }) => {
  const { user } = useAuth0();
  const [errorIsVisible, setErrorIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [input, setInput] = useState({
    userName: user.name,
    item: "",
    capacity: "",
    bulkQuantity: "",
    quantityNow: "",
    unit: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };
  // zrobić nastepne błędy
  const itemnull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole Nazwa jest wymagane. Proszę je uzupełnić.");
  };
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleClick = (event) => {
    event.preventDefault();
    console.log(input);
    const newItem = {
      userName: user.name,
      item: input.item,
      capacity: input.capacity,
      bulkQuantity: input.bulkQuantity,
      quantityNow: input.quantityNow,
      unit: input.unit,
    };
    if (!user.name) {
      return null;
    }
    if (!input.item) {
      return itemnull();
    }
    axios.post("http://localhost:6060/api/messages/create", newItem);
    setShowLoginModal(false);
  };

  return (
    <div className="wrapper">
      <div className="productModal">
        <div className="productModal-top">
          <p className="productModal-title">Dodaj nowy produkt</p>
          <div className="productModal-xbtn" onClick={handleCloseLoginModal}>
            &#10006;
          </div>
        </div>
        <div className="productModal-form">
          {errorIsVisible ? (
            <div className="error-div">
              <p>{errorMessage}</p>
            </div>
          ) : null}
          <form>
            <tr>
              <th>Nazwa</th>
              <th>
                <input
                  onChange={handleOnChange}
                  name="item"
                  value={input.item}
                  type="text"
                />
              </th>
            </tr>
            <tr>
              <th>Pojemność</th>
              <th>
                <input
                  onChange={handleOnChange}
                  name="capacity"
                  value={input.capacity}
                  type="text"
                />
              </th>
            </tr>
            <tr>
              <th>Opakowanie zbiorcze</th>
              <th>
                <input
                  onChange={handleOnChange}
                  name="bulkQuantity"
                  value={input.bulkQuantity}
                  type="number"
                />
              </th>
            </tr>
            <tr>
              <th>Nowa ilość na stanie</th>
              <th>
                <input
                  onChange={handleOnChange}
                  name="quantityNow"
                  value={input.quantityNow}
                  type="number"
                />
              </th>
            </tr>
            <tr>
              <th>Jednostka</th>
              <th>
                <input
                  onChange={handleOnChange}
                  name="unit"
                  value={input.unit}
                  type="text"
                />
              </th>
            </tr>

            <button
              className="button button--primary width-100"
              onClick={handleClick}
            >
              Dodaj
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
