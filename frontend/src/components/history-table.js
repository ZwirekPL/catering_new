export const HistoryTable = ({ inventory }) => {
  const productsArr = inventory.products;
  const createDate = inventory.createdAt.substr(0, 10);

  console.log(createDate);
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
            <p>Data utworzenia inwentaryzacji: {createDate}</p>
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
