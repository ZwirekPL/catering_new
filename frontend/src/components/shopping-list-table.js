import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AddListModal } from "./add-list-modal";
import { getUserItems } from "../services/message.service";

export const ShoppingListTable = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [message, setMessage] = useState([]);

  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    let isMounted = true;
    const getUserItem = async () => {
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
    getUserItem();
    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, user]);

  const handleRemoveItem = (index) => {
    // console.log("1", index);
    const idRemoveItem = message[index]._id;
    setMessage((message) =>
      message.filter((element) => element._id !== idRemoveItem)
    );
    console.log("12", message);
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
          <div className="parent-plus-trash">
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
      {showAddModal && (
        <AddListModal
          setShowAddModal={setShowAddModal}
          setMessage={setMessage}
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
