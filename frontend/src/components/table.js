import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AddProductModal } from "../components/addProductModal";
import { UpdateProductModal } from "../components/updateProductModal";
import { getUserItems } from "../services/message.service";

export const Table = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [idUpdateItem, setidUpdateItem] = useState();
  const [itemToUpdate, setitemToUpdate] = useState();
  const [message, setMessage] = useState([]);

  const { getAccessTokenSilently, user } = useAuth0();

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
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, showAddModal, user]);

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
              &#9998;<span class="plus-tooltiptext">Edytuj</span>
            </div>
            <div onClick={() => handleRemoveItem(index)} className="trash">
              &#10006;<span class="trash-tooltiptext">Usuń</span>
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
  const handleSendInventory = () => {
    console.log("message", message);
    axios.post(
      "http://localhost:6060/api/messages/inventory/send/" + user.name,
      message
    );
    // zrobić modal potwierdzający lub w przycisku.
    window.location.reload();
  };
  return (
    <>
      {showAddModal && <AddProductModal setShowAddModal={setShowAddModal} />}
      {showUpdateModal && (
        <UpdateProductModal
          setShowUpdateModal={setShowUpdateModal}
          idUpdateItem={idUpdateItem}
          itemToUpdate={itemToUpdate}
        />
      )}
      <div className="table-body">
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
