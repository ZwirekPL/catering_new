export const HistoryTable = ({ inventory }) => {
  const productsArr = inventory.products;
  const createDate = inventory.createdAt.substr(0, 10);
  const userName = inventory.userName;

  //   console.log(createDate);
  const renderInventory = (productsArr, index) => {
    return (
      <tr key={index}>
        <td>{productsArr.item}</td>
        <td>{productsArr.capacity}</td>
        <td>{productsArr.bulkQuantity}</td>
        <td>{productsArr.quantityNow}</td>
        <td>{productsArr.unit}</td>
      </tr>
    );
  };
  return (
    <>
      <div className="table-body">
        <table>
          <thead>
            <tr>
              <th>
                <p>Data utworzenia inwentaryzacji: {createDate}</p>
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <p>Użytkownik: {userName}</p>
              </th>
            </tr>
            <tr>
              <th>Nazwa</th>
              <th>Pojemność</th>
              <th>Opakowanie zbiorcze</th>
              <th>Ilość na stanie</th>
              <th>Jednostka</th>
            </tr>
          </thead>
          <tbody>{productsArr.map(renderInventory)}</tbody>
        </table>
      </div>
    </>
  );
};
