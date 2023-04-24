import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ErrorCategory } from "../layout/error-category";
import { AddListModal } from "../modals/add-list-modal";
import { UpdateListProductModal } from "../modals/update-list-product-modal";
import { getShoppingListHistory } from "../../services/message.service";

export const ShoppingListTableDrivers = () => {
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
      selectValue === "kierowca1@test.pl" ||
      selectValue === "kierowca2@test.pl" ||
      selectValue === "kierowca3@test.pl"
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
      selectValue === "kierowca1@test.pl" ||
      selectValue === "kierowca2@test.pl" ||
      selectValue === "kierowca3@test.pl"
    ) {
      const idRemoveItem = message[index]._id;
      axios.delete(
        "http://localhost:6060/api/messages/shopping/delete/" + idRemoveItem
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
          <div className="parent-edit-trash">
            <div className="edit" onClick={() => handleShowUpdateModal(index)}>
              &#9998;<span className="edit-tooltiptext">Edytuj</span>
            </div>
            <div onClick={() => handleRemoveItem(index)} className="trash">
              &#10006;<span className="trash-tooltiptext">Usuń</span>
            </div>
          </div>
        </td>
      </tr>
    );
  };
  const handleshowAddModal = () => setShowAddModal(true);
  const handleShowUpdateModal = (index) => {
    const idRemoveItem = message[index]._id;
    const itemToUpdate = message[index];
    setidUpdateItem(idRemoveItem);
    setitemToUpdate(itemToUpdate);
    setShowUpdateModal(true);
  };

  const handleSendShoppingList = () => {
    if (category) {
      axios.post(
        "http://localhost:6060/api/messages/shopping/send/" + selectValue,
        { data: message, editUser: user.name, category: category }
      );

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
      <div className="table-body">
        <div className="table-admin-wrapper">
          <label className="table-select-label" htmlFor="departament">
            Wybierz placówkę:
          </label>

          <select
            name="departament"
            id="departament"
            value={selectValue}
            onChange={handleChange}
            className="button table-select"
          >
            <option value="izbicka">izbicka</option>
            <option value="kamila@test.pl">stradomska</option>
            {/* <option value="stradomska">stradomska</option> */}
            <option value="dietyojca@gmail.com">białowieska</option>
            {/* <option value="białowieska">białowieska</option> */}
            <option value="glanzgarage@gmail.com">korytnicka</option>
            {/* <option value="korytnicka">korytnicka</option> */}
            <option value="terespolska">terespolska</option>
            <option value="tamka">tamka</option>
            <option value="broniewskiego">broniewskiego</option>
            <option value="szeligowska">szeligowska</option>
            <option value="chłapowskiego">chłapowskiego</option>
            <option value="aleja ken">aleja KEN</option>
            <option value="samochodowa1">Samochodowa U1</option>
            <option value="samochodowa2">Samochodowa U3</option>
            <option value="bobrowiecka">bobrowiecka</option>
            <option value="rekrucka1">rekrucka Żłobek</option>
            <option value="rek2">rekrucka Przedszkole</option>
          </select>
          <button
            onClick={handleGetOtherShoppingList}
            className="button button--primary table-select-button"
          >
            Pobierz
          </button>
        </div>
        {categoryErr && <ErrorCategory props={"listy zakupowej"} />}
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>
                  <button
                    onClick={() => handleCategory("groceries")}
                    className={`button button--primary width-190px ${
                      category === "groceries" && category
                    }`}
                  >
                    Art.spożywcze
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => handleCategory("chemical")}
                    className={`button button--third width-190px ${
                      category === "chemical" && category
                    }`}
                  >
                    Art.Chemiczne
                  </button>
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <button
                    className="button button--primary width-190px"
                    onClick={handleshowAddModal}
                  >
                    Dodaj nowy produkt
                  </button>
                </th>
              </tr>
              <tr>
                <th>Nazwa</th>
                <th>Pojemność</th>
                <th>Opakowanie zbiorcze</th>
                <th>Ilość na stanie</th>
                <th>Jednostka</th>
                <th></th>
              </tr>
            </thead>
            {message.length === 0 && (
              <tbody>
                <tr>
                  <td colspan="6">
                    <p className="handle-error">Nie znaleziono artykułów.</p>
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
