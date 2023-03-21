import React, { useEffect, useState } from "react";

export const AddProductModal = ({ setShowLoginModal }) => {
  const [input, setInput] = useState({
    name: "",
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
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleClick = (event) => {
    event.preventDefault();
    console.log(input);
  };
  return (
    <div className="wrapper">
      <div className="productModal">
        <div className="productModal-top">
          <p className="productModal-title">Dodaj nowy produkt</p>
          <div
            className="productModal-xbtn"
            onClick={handleCloseLoginModal}
          ></div>
        </div>
        <div className="productModal-form">
          <form>
            <tr>
              <th>Nazwa</th>
              <th>
                <input
                  onChange={handleOnChange}
                  name="name"
                  value={input.name}
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
