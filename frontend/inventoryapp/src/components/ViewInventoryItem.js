import React, { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InventoryItemForm } from "./InventoryItemForm";
import { getInventoryItemById, deleteInventoryItemById } from "../api/api";

export const ViewInventoryItem = () => {
  const match = useMatch("/view/:id");
  const navigate = useNavigate();
  const [item, setItem] = useState();
  useEffect(() => {
    const fetchItem = async () => {
      const inventoryItem = await getInventoryItemById(match.params.id);
      setItem(inventoryItem);
    };
    fetchItem();
  }, []);

  const deleteHandler = async () => {
    const confirmChoice = window.confirm(
      "Please confirm that you would like to delete this inventory item."
    );
    if (confirmChoice) {
        await deleteInventoryItemById(match.params.id);
        navigate("/");
    }
  };

  return item ? (
    <div className="container">
      <div className="mt3">
        <h3>View Inventory Item</h3>
        <button
          type="button"
          className="btn btn-danger"
          onClick={deleteHandler}
        >
          Delete Item
        </button>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Id</td>
              <td>{item._id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{item.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{item.description}</td>
            </tr>
            <tr>
              <td>Inventory Count</td>
              <td>{item.inventorycount}</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>{item.category}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div>Loading item...</div>
  );
};
