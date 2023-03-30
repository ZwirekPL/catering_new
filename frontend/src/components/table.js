import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AddProductModal } from "./add-product-modal";
import { UpdateProductModal } from "../components/updateProductModal";
import { getUserItems, getOtherUserItems } from "../services/message.service";

export const Table = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const [selectValue, setSelectValue] = useState(`${user.name}`);
  const [admin, setAdmin] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [idUpdateItem, setidUpdateItem] = useState();
  const [itemToUpdate, setitemToUpdate] = useState();
  const [message, setMessage] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getUserItems(accessToken, user);
      // console.log(user);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(data);
      }

      if (error) {
        setMessage(error);
      }

      if (user.email === "kamila@test.pl") {
        setAdmin(true);
      }
    };

    getMessage();
    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, user]);

  const handleSendInventory = () => {
    console.log("message", message);
    axios.post(
      "http://localhost:6060/api/messages/inventory/send/" + selectValue,
      { data: message, editUser: user.name }
    );
    if (user.email === "kamila@test.pl") return null;
    else {
      window.location.reload();
    }
  };
  const handleChange = (event) => {
    setSelectValue(event.target.value);
    // console.log(selectValue);
  };
  const handleClick = () => {
    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getOtherUserItems(accessToken, selectValue);
      // console.log(selectValue);

      if (data) {
        setMessage(data);
      }

      if (error) {
        setMessage(error);
      }
    };

    getMessage();
    // console.log(message);
  };

  const handleRemoveItem = (index) => {
    // console.log(index);
    const idRemoveItem = message[index]._id;
    // console.log(idRemoveItem);
    axios.delete("http://localhost:6060/api/messages/delete/" + idRemoveItem);
    window.location.reload();
  };
  // const handleUpdateItem = (index) => {
  //   const idUpdateItem = message[index]._id;
  //   axios.post("http://localhost:6060/api/messages/delete/" + idUpdateItem);
  //   window.location.reload();
  // };

  const renderInventory = (message, index) => {
    return (
      <tr key={index}>
        <td>{message.item}</td>
        <td>{message.capacity}</td>
        <td>{message.bulkQuantity}</td>
        <td>{message.quantityNow}</td>
        <td>{message.unit}</td>
        <td>
          <div className="parent-plus-trash">
            <div className="plus" onClick={() => handleShowUpdateModal(index)}>
              &#9998;<span className="plus-tooltiptext">Edytuj</span>
            </div>
            <div onClick={() => handleRemoveItem(index)} className="trash">
              &#10006;<span className="trash-tooltiptext">Usuń</span>
            </div>
          </div>
        </td>
      </tr>
    );
  };
  // console.log(message);
  const handleshowAddModal = () => setShowAddModal(true);
  const handleShowUpdateModal = (index) => {
    const idRemoveItem = message[index]._id;
    const itemToUpdate = message[index];
    setidUpdateItem(idRemoveItem);
    setitemToUpdate(itemToUpdate);
    // console.log(idUpdateItem);
    setShowUpdateModal(true);
  };
  return (
    <>
      {showAddModal && (
        <AddProductModal
          nameUser={selectValue}
          setShowAddModal={setShowAddModal}
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
      <div className="table-body">
        {admin && (
          <>
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
          </>
        )}
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
                  onClick={handleSendInventory}
                >
                  Potwierdź inwentaryzację
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};
