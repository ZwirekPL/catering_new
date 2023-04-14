import { useAuth0 } from "@auth0/auth0-react";
import { useCookies } from "react-cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AddListModal } from "./add-list-modal";
import { UpdateListProductModal } from "../components/update-list-product-modal";
// import { OkModal } from "./ok-modal";
import {
  getUserItems,
  getShoppingListHistory,
} from "../services/message.service";

export const ShoppingListTableDrivers = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [idUpdateItem, setidUpdateItem] = useState();
  const [itemToUpdate, setitemToUpdate] = useState();
  const [message, setMessage] = useState([]);
  const [cookies, setCookie] = useCookies(["currently"]);

  const [selectValue, setSelectValue] = useState(
    `${cookies.currently}` || `${user.name}`
  );
  const getMessage = async () => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getShoppingListHistory(
      accessToken,
      selectValue
    );
    if (data) {
      const length = data.length - 1;
      setMessage(data[length].products);
      setSelectValue(data[0].userName);
      setCookie("currently", `${data[0].userName}`, []);
    }

    if (error) {
      setMessage(error);
    }
  };
  useEffect(() => {
    let isMounted = true;
    const getUserItem = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getUserItems(accessToken, user);

      if (!isMounted) {
        return;
      }
      if (data) {
        setMessage(data);
        setSelectValue(data[0].userName);
        setCookie("currently", `${data[0].userName}`, []);
      }
      if (error) {
        setMessage(error);
      }
      if (
        user.email === "kierowca1@test.pl" ||
        user.email === "kierowca2@test.pl" ||
        user.email === "kierowca3@test.pl"
      ) {
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
    // console.log("1", index);
    const idRemoveItem = message[index]._id;
    setMessage((message) =>
      message.filter((element) => element._id !== idRemoveItem)
    );
    // console.log("12", message);
  };
  const handleChange = (event) => {
    setSelectValue(event.target.value);
    // console.log(selectValue);
  };
  const handleClick = () => {
    getMessage();
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
  //   console.log(listNow);
  const handleshowAddModal = () => setShowAddModal(true);
  const handleShowUpdateModal = (index) => {
    const idRemoveItem = message[index]._id;
    const itemToUpdate = message[index];
    setidUpdateItem(idRemoveItem);
    setitemToUpdate(itemToUpdate);
    // console.log(idUpdateItem);
    setShowUpdateModal(true);
  };

  const handleSendShoppingList = () => {
    console.log("message", message);
    axios.post(
      "http://localhost:6060/api/messages/shopping/send/" + selectValue,
      { data: message, editUser: user.name }
    );
    if (user.email === "kamila@test.pl") return null;
    else {
      window.location.reload();
    }
  };
  return (
    <>
      {showAddModal && (
        <AddListModal
          setShowAddModal={setShowAddModal}
          setMessage={setMessage}
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
        <label for="departament">Wybierz placówkę:</label>

        <select
          name="departament"
          id="departament"
          value={selectValue}
          onChange={handleChange}
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
        <button onClick={handleClick}>Pobierz</button>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
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
          <tbody>{message.map(renderInventory)}</tbody>
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
    </>
  );
};