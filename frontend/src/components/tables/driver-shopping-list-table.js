import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ErrorCategory } from "../layout/error-category";
import { AddListModal } from "../modals/add-list-modal";
import { UpdateListProductModal } from "../modals/update-list-product-modal";
import { getShoppingListHistory } from "../../services/message.service";

export const ShoppingListTableDrivers = () => {
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
  const { getAccessTokenSilently, user } = useAuth0();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [idUpdateItem, setidUpdateItem] = useState();
  const [itemToUpdate, setitemToUpdate] = useState();
  const [category, setCategory] = useState();
  const [filteredMessage, setFilteredMessage] = useState(null);
  const [message, setMessage] = useState([]);
  const [categoryErr, setCategoryErr] = useState(false);
  const [selectValue, setSelectValue] = useState(`${user.name}`);

  const getMessage = async (string) => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getShoppingListHistory(
      accessToken,
      selectValue
    );
    if (
      selectValue === "driver1@test.pl" ||
      selectValue === "driver2@test.pl" ||
      selectValue === "driver3@test.pl"
    ) {
      if (string) {
        if (data) {
          const filter = data.filter((element) => element.category === string);
          setMessage(filter);
          setFilteredMessage(null);
        }

        if (error) {
          setMessage(error);
        }
      } else {
        if (data) {
          setMessage(data);
          setFilteredMessage(null);
        }
        if (error) {
          setMessage(error);
        }
      }
    } else {
      if (string) {
        if (data) {
          const filter = data.findLast(
            (element) => element.category === string
          );
          setMessage(filter.products);
          setFilteredMessage(null);
        }

        if (error) {
          setMessage(error);
        }
      } else {
        if (data) {
          const length = data.length - 1;
          setMessage(data[length].products);
          setFilteredMessage(null);
        }
        if (error) {
          setMessage(error);
        }
      }
    }
  };

  useEffect(() => {
    getMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessTokenSilently, user]);

  const handleRemoveItem = (index) => {
    if (
      selectValue === "driver1@test.pl" ||
      selectValue === "driver2@test.pl" ||
      selectValue === "driver3@test.pl"
    ) {
      const idRemoveItem = message[index]._id;
      axios.delete(
        `${apiServerUrl}/api/messages/shopping/delete/` + idRemoveItem
      );
      window.location.reload();
    } else {
      const idRemoveItem = message[index]._id;
      setMessage((message) =>
        message.filter((element) => element._id !== idRemoveItem)
      );
    }
  };
  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  const handleGetOtherShoppingList = () => {
    setCategory(null);
    setMessage([]);
    getMessage();
  };

  const handleCategory = (string) => {
    getMessage(string);
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
    const idRemoveItem = message[index]._id;
    const itemToUpdate = message[index];
    setidUpdateItem(idRemoveItem);
    setitemToUpdate(itemToUpdate);
    setShowUpdateModal(true);
  };

  const handleSendShoppingList = () => {
    if (category) {
      axios.post(`${apiServerUrl}/api/messages/shopping/send/` + selectValue, {
        data: message,
        editUser: user.name,
        category: category,
      });

      window.location.reload();
    } else {
      setCategoryErr(!categoryErr);
    }
  };
  return (
    <>
      {showAddModal && (
        <AddListModal
          setShowAddModal={setShowAddModal}
          setMessage={setMessage}
          category={category}
        />
      )}
      {showUpdateModal && (
        <UpdateListProductModal
          setShowUpdateModal={setShowUpdateModal}
          nameUser={selectValue}
          idUpdateItem={idUpdateItem}
          itemToUpdate={itemToUpdate}
          setMessage={setMessage}
        />
      )}
      <div className="table__body">
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
            <option value="user1@test.pl">Użytkownik1</option>
            <option value="user2@test.pl">Użytkownik2</option>
            <option value="user3@test.pl">Użytkownik3</option>
            <option value="user4@test.pl">Użytkownik4</option>
            <option value="user5@test.pl">Użytkownik5</option>
            <option value="user6@test.pl">Użytkownik6</option>
            <option value="user7@test.pl">Użytkownik7</option>
            <option value="user8@test.pl">Użytkownik8</option>
            <option value="user9@test.pl">Użytkownik9</option>
            <option value="user10@test.pl">Użytkownik10</option>
            <option value="user11@test.pl">Użytkownik11</option>
            <option value="user12@test.pl">Użytkownik12</option>
            <option value="user13@test.pl">Użytkownik13</option>
            <option value="user14@test.pl">Użytkownik14</option>
            <option value="user15@test.pl">Użytkownik15</option>
          </select>
          <button
            onClick={handleGetOtherShoppingList}
            className="button button--primary"
          >
            Pobierz
          </button>
        </div>
        {categoryErr && <ErrorCategory props={"listy zakupowej"} />}
        <div>
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
                <th>Nazwa</th>
                <th>Pojemność</th>
                <th>Opakowanie zbiorcze</th>
                <th>Ilość do kupienia</th>
                <th>Jednostka</th>
                <th></th>
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
                  {user.email === selectValue && (
                    <button
                      className="button button--secondary"
                      onClick={handleSendShoppingList}
                    >
                      Potwierdź listę zakupową
                    </button>
                  )}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};
