import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ErrorCategory } from "../layout/error-category";
import { AddProductModal } from "../modals/add-storage-product-modal";
import { UpdateProductModal } from "../modals/update-storage-product-modal";
import {
  getUserItems,
  getOtherUserItems,
} from "../../services/message.service";

export const Table = () => {
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
  const { getAccessTokenSilently, user } = useAuth0();
  let currently = sessionStorage.getItem("currently");

  const [selectValue, setSelectValue] = useState(currently || `${user.name}`);
  const [admin, setAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [idUpdateItem, setidUpdateItem] = useState();
  const [itemToUpdate, setitemToUpdate] = useState();
  const [category, setCategory] = useState();
  const [filteredMessage, setFilteredMessage] = useState(null);
  const [message, setMessage] = useState([]);
  const [categoryErr, setCategoryErr] = useState(false);

  const currentlyGet = (data) => {
    if (data) {
      if (currently == null) {
        currently = data[0].userName;
      } else {
        currently = selectValue;
      }
      sessionStorage.setItem("currently", currently);
    }
  };

  const getMessage = async () => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getOtherUserItems(accessToken, selectValue);
    if (data) {
      setMessage(data);
      currentlyGet(data);
      setFilteredMessage(null);
    }
    if (error) {
      setMessage(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const getUserInv = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getUserItems(accessToken, user);
      if (!isMounted) {
        return;
      }
      if (data) {
        setMessage(data);
        currentlyGet(data);
      }
      if (error) {
        setMessage(error);
      }
      if (user.email === "admin@test.com") {
        setAdmin(true);
        getMessage();
      }
    };
    getUserInv();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessTokenSilently, user]);

  const handleSendInventory = () => {
    if (category) {
      if (filteredMessage !== null) {
        axios.post(
          `${apiServerUrl}/api/messages/inventory/send/` + selectValue,
          { data: filteredMessage, editUser: user.name, category: category }
        );
      }
      if (filteredMessage === null) {
        axios.post(
          `${apiServerUrl}/api/messages/inventory/send/` + selectValue,
          { data: message, editUser: user.name }
        );
      }
      if (user.email === "admin@test.com") return null;
      else {
        window.location.reload();
      }
    } else {
      setCategoryErr(!categoryErr);
    }
  };

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  const handleGetOtherItems = () => {
    getMessage();
  };

  const handleRemoveItem = (index) => {
    const idRemoveItem = message[index]._id;
    axios.delete(`${apiServerUrl}/api/messages/delete/` + idRemoveItem);
    window.location.reload();
  };

  const handleCategory = (string) => {
    const afterFilter = message.filter(
      (element) => element.category === string
    );
    setFilteredMessage(afterFilter);
    setCategory(string);
  };

  const renderInventory = (message, index) => {
    return (
      <tr key={index}>
        <td>{message.item}</td>
        <td>{message.capacity}</td>
        <td>{message.bulkQuantity}</td>
        <td>{message.quantityNow}</td>
        <td>{message.unit}</td>
        <td>
          <div className="container__controls">
            <div
              className="controls__edit"
              onClick={() => handleShowUpdateModal(index)}
            >
              &#9998;<span className="controls__edit-tooltiptext">Edytuj</span>
            </div>
            <div
              onClick={() => handleRemoveItem(index)}
              className="controls__trash"
            >
              &#10006;<span className="controls__trash-tooltiptext">Usuń</span>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  const handleshowAddModal = () => {
    if (category) {
      setShowAddModal(true);
    } else {
      setCategoryErr(!categoryErr);
    }
  };

  const handleShowUpdateModal = (index) => {
    if (filteredMessage) {
      const idRemoveItem = filteredMessage[index]._id;
      const itemToUpdate = filteredMessage[index];
      setidUpdateItem(idRemoveItem);
      setitemToUpdate(itemToUpdate);
      setShowUpdateModal(true);
    } else {
      const idRemoveItem = message[index]._id;
      const itemToUpdate = message[index];
      setidUpdateItem(idRemoveItem);
      setitemToUpdate(itemToUpdate);
      setShowUpdateModal(true);
    }
  };

  return (
    <>
      {showAddModal && (
        <AddProductModal
          nameUser={selectValue}
          setShowAddModal={setShowAddModal}
          category={category}
        />
      )}
      {showUpdateModal && (
        <UpdateProductModal
          setShowUpdateModal={setShowUpdateModal}
          nameUser={selectValue}
          idUpdateItem={idUpdateItem}
          itemToUpdate={itemToUpdate}
        />
      )}
      <div className="table__body">
        {admin && (
          <div className="table__admin-wrapper">
            <label className="admin__select-label" htmlFor="departament">
              Wybierz placówkę:
            </label>
            <select
              name="departament"
              id="departament"
              value={selectValue}
              onChange={handleChange}
              className="button admin__select"
            >
              <option value="user1@test.com">Użytkownik1</option>
              <option value="user2@test.com">Użytkownik2</option>
              <option value="user3@test.com">Użytkownik3</option>
              <option value="user4@test.com">Użytkownik4</option>
              <option value="user5@test.com">Użytkownik5</option>
              <option value="user6@test.com">Użytkownik6</option>
              <option value="user7@test.com">Użytkownik7</option>
              <option value="user8@test.com">Użytkownik8</option>
              <option value="user9@test.com">Użytkownik9</option>
              <option value="user10@test.com">Użytkownik10</option>
              <option value="user11@test.com">Użytkownik11</option>
              <option value="user12@test.com">Użytkownik12</option>
              <option value="user13@test.com">Użytkownik13</option>
              <option value="user14@test.com">Użytkownik14</option>
              <option value="user15@test.com">Użytkownik15</option>
            </select>
            <button
              className="button button--primary"
              onClick={handleGetOtherItems}
            >
              Pobierz
            </button>
          </div>
        )}
        {categoryErr && !category && <ErrorCategory props={"inwentaryzacji"} />}
        <div>
          {" "}
          <button
            onClick={() => handleCategory("groceries")}
            className={`button button--primary ${
              category === "groceries" && category
            }`}
          >
            Art.spożywcze
          </button>
          <button
            onClick={() => handleCategory("chemical")}
            className={`button button--third ${
              category === "chemical" && category
            }`}
          >
            Art.Chemiczne
          </button>
          <button
            className="button button--primary"
            onClick={handleshowAddModal}
          >
            Dodaj nowy produkt
          </button>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="table-header">Nazwa</th>
                <th className="table-header">Pojemność</th>
                <th className="table-header">Zbiorcze</th>
                <th className="table-header">Ilość</th>
                <th className="table-header">Jednostka</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            {message.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan="6">
                    <p className="storage__error">Nie znaleziono artykułów.</p>
                  </td>
                </tr>
              </tbody>
            )}
            {filteredMessage === null && (
              <tbody>{message.map(renderInventory)}</tbody>
            )}
            {filteredMessage && (
              <tbody>{filteredMessage.map(renderInventory)}</tbody>
            )}
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <button
                    className="button button--secondary"
                    onClick={handleSendInventory}
                  >
                    Potwierdź inwentaryzację
                  </button>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};
