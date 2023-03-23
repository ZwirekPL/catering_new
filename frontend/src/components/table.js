import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { AddProductModal } from "../components/addProductModal";
import { getProtectedResource } from "../services/message.service";

export const Table = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [message, setMessage] = useState([]);
  // const inventory = [
  //   {
  //     name: "Pomidor",
  //     producer: "Pan Warzywko",
  //     category: "Warzywa",
  //     buyBy: "Kierowcy",
  //     whereBuy: "sergross",
  //     quantity: "34",
  //     unit: "szt.",
  //     bulkQuantity: "23",
  //     capacity: "ND",
  //   },
  //   {
  //     name: "Ogórek",
  //     producer: "Sellgross",
  //     category: "Warzywa",
  //     buyBy: "Kierowcy",
  //     whereBuy: "sergross",
  //     quantity: "0",
  //     unit: "szt.",
  //     bulkQuantity: "16",
  //     capacity: "ND",
  //   },
  //   {
  //     name: "Płatki Owsiane",
  //     producer: "Melvit",
  //     category: "Sypkie",
  //     buyBy: "Transgourmet",
  //     whereBuy: "Transgourmet",
  //     quantity: "12",
  //     unit: "szt.",
  //     bulkQuantity: "6",
  //     capacity: "1kg",
  //   },
  //   {
  //     name: "Dżem",
  //     producer: "Łowicz",
  //     category: "Słoiki",
  //     buyBy: "Transgourmet",
  //     whereBuy: "Transgourmet",
  //     quantity: "1",
  //     unit: "szt.",
  //     bulkQuantity: "6",
  //     capacity: "400g",
  //   },
  //   {
  //     name: "Masło",
  //     producer: "Pilos",
  //     category: "Przetwory Mleczne",
  //     buyBy: "Kierowcy",
  //     whereBuy: "Lidl",
  //     quantity: "12",
  //     unit: "szt.",
  //     bulkQuantity: "40",
  //     capacity: "250g",
  //   },
  //   {
  //     name: "Bułeczki Maślane",
  //     producer: "Pano",
  //     category: "Pieczywo",
  //     buyBy: "Kierowcy",
  //     whereBuy: "Biedronka",
  //     quantity: "10",
  //     unit: "szt.",
  //     bulkQuantity: "8",
  //     capacity: "10szt.",
  //   },
  //   {
  //     name: "Olej",
  //     producer: "TopSeller",
  //     category: "Oleje",
  //     buyBy: "Transgourmet",
  //     whereBuy: "Transgourmet",
  //     quantity: "2",
  //     unit: "szt.",
  //     bulkQuantity: "4",
  //     capacity: "5L",
  //   },
  //   {
  //     name: "Kasza Bulgur",
  //     producer: "TopSeller",
  //     category: "Sypkie",
  //     buyBy: "Transgourmet",
  //     whereBuy: "Transgourmet",
  //     quantity: "1",
  //     unit: "szt.",
  //     bulkQuantity: "1",
  //     capacity: "5kg",
  //   },
  //   {
  //     name: "Szpinak",
  //     producer: "Mrożone",
  //     category: "Mrożone",
  //     buyBy: "Kierowcy",
  //     whereBuy: "Biedronka",
  //     quantity: "0",
  //     unit: "szt.",
  //     bulkQuantity: "1",
  //     capacity: "xxxg",
  //   },
  //   {
  //     name: "Domestos",
  //     producer: "Domestos",
  //     category: "Chemia",
  //     buyBy: "Kierowcy",
  //     whereBuy: "sergross",
  //     quantity: "0",
  //     unit: "szt.",
  //     bulkQuantity: "6",
  //     capacity: "1L",
  //   },
  //   {
  //     name: "Płyn do zmywarki",
  //     producer: "Stalgast",
  //     category: "Chemia",
  //     buyBy: "Kamila",
  //     whereBuy: "Sklepie",
  //     quantity: "6",
  //     unit: "szt.",
  //     bulkQuantity: "1",
  //     capacity: "10L",
  //   },
  //   {
  //     name: "Żółty Ser",
  //     producer: "Pilos",
  //     category: "Przetwory Mleczne",
  //     buyBy: "Kierowcy",
  //     whereBuy: "Lidl",
  //     quantity: "12",
  //     unit: "szt.",
  //     bulkQuantity: "35",
  //     capacity: "500g",
  //   },
  //   {
  //     name: "Ser na tosty",
  //     producer: "Pilos",
  //     category: "Przetwory Mleczne",
  //     buyBy: "Kierowcy",
  //     whereBuy: "Lidl",
  //     quantity: "12",
  //     unit: "szt.",
  //     bulkQuantity: "23",
  //     capacity: "200g",
  //   },
  //   {
  //     name: "Chleb Tostowy",
  //     producer: "Pano",
  //     category: "Pieczywo",
  //     buyBy: "Kierowcy",
  //     whereBuy: "Biedronka",
  //     quantity: "0",
  //     unit: "szt.",
  //     bulkQuantity: "8",
  //     capacity: "500g",
  //   },
  //   {
  //     name: "Sałata",
  //     producer: "Sellgross",
  //     category: "Warzywa",
  //     buyBy: "Kierowcy",
  //     whereBuy: "sergross",
  //     quantity: "34",
  //     unit: "szt.",
  //     bulkQuantity: "23",
  //     capacity: "ND",
  //   },
  //   {
  //     name: "Końcówka do mopa płaska",
  //     producer: "Vileda",
  //     category: "Chemia",
  //     buyBy: "Kierowcy",
  //     whereBuy: "sergross",
  //     quantity: "34",
  //     unit: "szt.",
  //     bulkQuantity: "23",
  //     capacity: "ND",
  //   },
  //   {
  //     name: "Folia aluminiowa",
  //     producer: "Lidl",
  //     category: "Chemia",
  //     buyBy: "Kierowcy",
  //     whereBuy: "Lidl",
  //     quantity: "34",
  //     unit: "szt.",
  //     bulkQuantity: "23",
  //     capacity: "ND",
  //   },
  //   {
  //     name: "Makaron Spaghetti",
  //     producer: "Lidl",
  //     category: "Sypkie",
  //     buyBy: "Kierowcy",
  //     whereBuy: "Lidl",
  //     quantity: "34",
  //     unit: "szt.",
  //     bulkQuantity: "23",
  //     capacity: "500g",
  //   },
  //   {
  //     name: "Makaron Penne",
  //     producer: "Lidl",
  //     category: "Sypkie",
  //     buyBy: "Kierowcy",
  //     whereBuy: "Lidl",
  //     quantity: "34",
  //     unit: "szt.",
  //     bulkQuantity: "23",
  //     capacity: "500g",
  //   },
  //   {
  //     name: "Twaróg z rzodkiewką",
  //     producer: "President",
  //     category: "Przetwory Mleczne",
  //     buyBy: "Kierowcy",
  //     whereBuy: "Biedronka",
  //     quantity: "34",
  //     unit: "szt.",
  //     bulkQuantity: "23",
  //     capacity: "250g",
  //   },
  // ];

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getProtectedResource(accessToken);
      // console.log(data);

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
  }, [getAccessTokenSilently, showLoginModal]);
  const handleRemoveItem = (index) => {
    console.log(index);
    const idRemoveItem = message[index]._id;
    console.log(idRemoveItem);
  };

  const renderInventory = (message, index) => {
    return (
      <tr key={index}>
        <td>{message.item}</td>
        <td>{message.capacity}</td>
        <td>{message.quantityNow}</td>
        <td>
          <input type="number" placeholder="Wpisz nową wartość" />
        </td>
        <td>
          <div className="parent-unit-trash">
            <div>{message.unit}</div>
            <div onClick={() => handleRemoveItem(index)} className="trash">
              &#10006;
            </div>
          </div>
        </td>
      </tr>
    );
  };
  // console.log(message);
  const handleShowLoginModal = () => setShowLoginModal(true);
  return (
    <>
      {showLoginModal && (
        <AddProductModal setShowLoginModal={setShowLoginModal} />
      )}
      <div className="table-body">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <button
                  className="button button--primary"
                  onClick={handleShowLoginModal}
                >
                  Dodaj nowy produkt
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Nazwa</th>
              <th>Pojemność</th>
              <th>Opakowanie zbiorcze</th>
              <th>Nowa ilość na stanie</th>
              <th>Jednostka</th>
            </tr>
            {message.map(renderInventory)}
          </tbody>
        </table>
      </div>
    </>
  );
};
