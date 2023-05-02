import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const UpdateListProductModal = ({
  setShowUpdateModal,
  nameUser,
  idUpdateItem,
  itemToUpdate,
  setMessage,
}) => {
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
  const { user } = useAuth0();

  const [errorIsVisible, setErrorIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [input, setInput] = useState({
    userName: nameUser,
    item: itemToUpdate.item,
    capacity: itemToUpdate.capacity,
    bulkQuantity: itemToUpdate.bulkQuantity,
    quantityNow: itemToUpdate.quantityNow,
    unit: itemToUpdate.unit,
    editBy: user.name,
    category: itemToUpdate.category,
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
  // ERRORS
  const itemNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole Nazwa jest wymagane. Proszę je uzupełnić.");
  };
  const capacityNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole Pojemność jest wymagane. Proszę je uzupełnić.");
  };
  const bulkQuantityNull = () => {
    setErrorIsVisible(true);
    setErrorMessage(
      "Pole Opakowanie zbiorcze jest wymagane. Proszę je uzupełnić."
    );
  };
  const quantityNowNull = () => {
    setErrorIsVisible(true);
    setErrorMessage(
      "Pole Nowa ilość na stanie jest wymagane. Proszę je uzupełnić."
    );
  };
  const unitNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole Jednostka jest wymagane. Proszę je uzupełnić.");
  };
  const categoryNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole kategoria jest wymagane. Proszę je uzupełnić.");
  };
  //.
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleClick = (event) => {
    event.preventDefault();
    const updateItem = {
      userName: nameUser,
      item: input.item,
      capacity: input.capacity,
      bulkQuantity: input.bulkQuantity,
      quantityNow: input.quantityNow,
      unit: input.unit,
      editBy: user.name,
    };
    if (!nameUser) {
      return null;
    }
    if (!input.category) {
      return categoryNull();
    }
    if (!input.item) {
      return itemNull();
    }
    if (!input.capacity) {
      return capacityNull();
    }
    if (!input.bulkQuantity) {
      return bulkQuantityNull();
    }
    if (!input.quantityNow) {
      return quantityNowNull();
    }
    if (!input.unit) {
      return unitNull();
    }
    if (
      nameUser === "driver1@test.com" ||
      nameUser === "driver2@test.com" ||
      nameUser === "driver3@test.com"
    ) {
      axios.post(
        `${apiServerUrl}/api/messages/shopping/update/` + idUpdateItem,
        updateItem
      );
      setShowUpdateModal(false);
      window.location.reload();
    } else {
      setMessage((message) =>
        message.filter((element) => element._id !== idUpdateItem)
      );
      setMessage((oldArray) => [...oldArray, input]);
      setShowUpdateModal(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="productModal">
        <div className="productModal__top">
          <p className="productModal__title">
            Edytujesz:{" "}
            <strong>
              {itemToUpdate.item.charAt(0).toUpperCase() +
                itemToUpdate.item.slice(1)}
            </strong>
          </p>
          <div className="productModal__xbtn" onClick={handleCloseUpdateModal}>
            &#10006;
          </div>
        </div>
        <div className="productModal__form">
          {errorIsVisible ? (
            <div className="error__div">
              <p>{errorMessage}</p>
            </div>
          ) : null}
          <form id="update__list-form"></form>
          <table className="table__modal">
            <tbody>
              <tr>
                <th>
                  <input
                    type="radio"
                    name="category"
                    id="groceries"
                    value="groceries"
                    onChange={handleOnChange}
                    defaultChecked={input.category === "groceries"}
                  />
                  <label htmlFor="groceries" className="option option-1">
                    <div className="dot"></div>
                    <span>Art.spożywcze</span>
                  </label>
                </th>
                <th>
                  <input
                    type="radio"
                    name="category"
                    id="chemical"
                    value="chemical"
                    onChange={handleOnChange}
                    defaultChecked={input.category === "chemical"}
                  />
                  <label htmlFor="chemical" className="option option-2">
                    <div className="dot"></div>
                    <span>Art.chemiczne</span>
                  </label>
                </th>
              </tr>
              <tr>
                <th>Nazwa</th>
                <th>
                  <input
                    onChange={handleOnChange}
                    name="item"
                    value={input.item}
                    type="text"
                    form="update__list-form"
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
                    form="update__list-form"
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
                    form="update__list-form"
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
                    form="update__list-form"
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
                    form="update__list-form"
                  />
                </th>
              </tr>
            </tbody>
          </table>
          <button
            className="button button--primary width-100"
            onClick={handleClick}
            form="update__list-form"
          >
            Zmień
          </button>
        </div>
      </div>
    </div>
  );
};
