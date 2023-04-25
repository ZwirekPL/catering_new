import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const AddProductModal = ({ setShowAddModal, nameUser }) => {
  const { user } = useAuth0();
  const [errorIsVisible, setErrorIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [input, setInput] = useState({
    userName: nameUser,
    item: "",
    capacity: "",
    bulkQuantity: "",
    quantityNow: "",
    unit: "",
    editBy: user.name,
    category: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    const toLowerCase = value.toLowerCase();
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: toLowerCase,
      };
    });
  };

  // ERRORS
  const itemNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole nazwa jest wymagane. Proszę je uzupełnić.");
  };
  const capacityNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole pojemność jest wymagane. Proszę je uzupełnić.");
  };
  const bulkQuantityNull = () => {
    setErrorIsVisible(true);
    setErrorMessage(
      "Pole opakowanie zbiorcze jest wymagane. Proszę je uzupełnić."
    );
  };
  const quantityNowNull = () => {
    setErrorIsVisible(true);
    setErrorMessage(
      "Pole nowa ilość na stanie jest wymagane. Proszę je uzupełnić."
    );
  };
  const unitNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole jednostka jest wymagane. Proszę je uzupełnić.");
  };

  const categoryNull = () => {
    setErrorIsVisible(true);
    setErrorMessage("Pole kategoria jest wymagane. Proszę je uzupełnić.");
  };
  //.
  const handleCloseLoginModal = () => setShowAddModal(false);
  const handleClick = (event) => {
    event.preventDefault();
    // console.log(user);
    const newItem = {
      userName: nameUser,
      item: input.item,
      capacity: input.capacity,
      bulkQuantity: input.bulkQuantity,
      quantityNow: input.quantityNow,
      unit: input.unit,
      category: input.category,
      editBy: user.name,
    };
    if (!nameUser) {
      return null;
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
    if (!input.category) {
      return categoryNull();
    }
    axios.post("http://localhost:6060/api/messages/create", newItem);
    setShowAddModal(false);
    window.location.reload();
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
          <form id="add-storage-form"></form>
          <table>
            {" "}
            <tr>
              <th>
                <input
                  type="radio"
                  name="category"
                  id="groceries"
                  value="groceries"
                  onChange={handleOnChange}
                />
                <label htmlFor="groceries" class="option option-1">
                  <div class="dot"></div>
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
                />
                <label htmlFor="chemical" class="option option-2">
                  <div class="dot"></div>
                  <span>Art.chemiczne</span>
                </label>
              </th>
            </tr>
            <tr>
              <th>Nazwa</th>
              <th>
                <input
                  autoFocus
                  onChange={handleOnChange}
                  name="item"
                  value={input.item}
                  type="text"
                  form="add-storage-form"
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
                  form="add-storage-form"
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
                  form="add-storage-form"
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
                  form="add-storage-form"
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
                  form="add-storage-form"
                />
              </th>
            </tr>
          </table>
          <button
            className="button button--primary width-100"
            onClick={handleClick}
            form="add-storage-form"
          >
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};