import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllInventoryItems, deleteInventoryItems, createExportCSV } from "../api/api";
import { useNavigate } from "react-router-dom";

export const InventoryItemList = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllItems = async () => {
      const allItems = await getAllInventoryItems();
      setItems(allItems);
    };
    fetchAllItems();
  }, []);

  const rowSelectChange = (e, item) => {
    console.log(item._id);
    let oldSelectedItems = [...selectedItems];
    const itemIndex = oldSelectedItems.indexOf(item._id);
    //If it already exists.
    if (itemIndex === -1) {
      oldSelectedItems.push(item._id);
    } else {
      oldSelectedItems.splice(itemIndex, 1);
    }
    setSelectedItems(oldSelectedItems);
  };

  const deleteHandler = async () => {
    const confirmChoice = window.confirm(
      "Please confirm that you would like to delete " +
        selectedItems.length +
        " items."
    );
    if (confirmChoice) {
      await deleteInventoryItems(selectedItems);
      window.location.reload();
    }
  };

  const exportAsCSV = async () => {

    const response = await createExportCSV(selectedItems);
    const csvString = await response.text();
    const link = document.createElement('a');
    link.href = `data:text/csv;charset=utf-8,${escape(csvString)}`;
    link.setAttribute('download', 'exported-inventory-item-data.csv');
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div className="container">
      <div className="mt-3">
        <h3>Inventory Item List</h3>
        <button
          type="button"
          className="btn btn-danger"
          disabled={!(selectedItems && selectedItems.length)}
          onClick={deleteHandler}
        >
          Delete Selected
        </button>
        <button
          type="button"
          className="btn btn-info"
          disabled={!(selectedItems && selectedItems.length)}
          onClick={exportAsCSV}
        >
          Export as CSV
        </button>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Category</th>
              <th>Inventory Count</th>
              <th>Edit</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={"rowselect" + item._id}
                    onChange={(e) => rowSelectChange(e, item)}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.inventorycount}</td>
                <td>
                  <Link to={"edit/" + item._id}>Edit</Link>
                </td>
                <td>
                  <Link to={"view/" + item._id}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
