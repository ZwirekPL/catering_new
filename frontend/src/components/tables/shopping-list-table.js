import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ErrorCategory } from "../layout/error-category";
import { AddListModal } from "../modals/add-list-modal";
import { UpdateListProductModal } from "../modals/update-list-product-modal";
import { getShoppingListHistory } from "../../services/message.service";

export const ShoppingListTable = () => {
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  const { getAccessTokenSilently, user } = useAuth0();
  let currently = sessionStorage.getItem("currently");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [idUpdateItem, setidUpdateItem] = useState();
  const [itemToUpdate, setitemToUpdate] = useState();
  const [category, setCategory] = useState();
  const [filteredMessage, setFilteredMessage] = useState(null);
  const [message, setMessage] = useState([]);
  const [categoryErr, setCategoryErr] = useState(false);

  const [selectValue, setSelectValue] = useState(currently || `${user.name}`);
  const [admin, setAdmin] = useState(false);
  const currentlyGet = (data) => {
    if (data) {
      if (currently == null) {
        // Initialize page views count
        currently = data[0].userName;
      } else {
        // Increment count
        currently = selectValue;
      }
      // Update session storage
      sessionStorage.setItem("currently", currently);
    }
  };
  const getMessage = async (string) => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getShoppingListHistory(
      accessToken,
      selectValue
    );
    if (string) {
      if (data) {
        const filter = data.findLast((element) => element.category === string);
        setMessage(filter.products);
        currentlyGet(data);
        setFilteredMessage(null);
      }
      if (error) {
        setMessage(error);
      }
    } else {
      if (data) {
        const length = data.length - 1;
        setMessage(data[length].products);
        currentlyGet(data);
        setFilteredMessage(null);
      }

      if (error) {
        setMessage(error);
      }
    }
  };
  useEffect(() => {
    let isMounted = true;
    const getUserItem = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getShoppingListHistory(
        accessToken,
        user.name
      );
      if (!isMounted) {
        return;
      }
      if (data) {
        const length = data.length - 1;
        setMessage(data[length].products);
        setSelectValue(data[0].userName);
        currentlyGet(data);
      }
      if (error) {
        setMessage(error);
      }
      if (user.email === "kamila@test.pl") {
        setAdmin(true);
        getMessage();
      }
    };
    getUserItem();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessTokenSilently, user]);
  const handleRemoveItem = (index) => {
    const idRemoveItem = message[index]._id;
    setMessage((message) =>
      message.filter((element) => element._id !== idRemoveItem)
    );
  };
  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  const handleGetOtherShoppingList = () => {
    setCategory(null);
    getMessage();
  };
  const handleCategory = (string) => {
    getMessage(string);
    const afterFilter = message.filter(
      (element) => element.category === string
    );
    setFilteredMessage(afterFilter);

    // console.log(afterFilter);
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
      if (user.email === "kamila@test.pl") return null;
      else {
        window.location.reload();
      }
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
        {admin && (
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
              <option value="rekrucka2">rekrucka Przedszkole</option>
            </select>
            <button
              className="button button--primary table-select-button"
              onClick={handleGetOtherShoppingList}
            >
              Pobierz
            </button>
          </div>
        )}
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
                <th>Zbiorcze</th>
                <th>Ilość</th>
                <th>Jednostka</th>
                <th></th>
              </tr>
            </thead>
            {message.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan="6">
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
                  <button
                    className="button button--secondary"
                    onClick={handleSendShoppingList}
                  >
                    Potwierdź listę zakupową
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
