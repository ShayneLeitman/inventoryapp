import React, { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InventoryItemForm } from "./InventoryItemForm";
import { getInventoryItemById, updateInventoryItemById } from "../api/api";

export const EditInventoryItem = () => {
  const match = useMatch("/edit/:id");
  const navigate = useNavigate();
  const [item, setItem] = useState();
  useEffect(() => {
    const fetchItem = async () => {
      const inventoryItem = await getInventoryItemById(
        match.params.id
      );
      setItem(inventoryItem);
    };
    fetchItem();
  }, []);

  const onSubmit = async (data) => {
    await updateInventoryItemById(match.params.id, data);
    navigate("/");
  };

  return item ? (
    <div className="container">
      <div className="mt3">
        <h3>Edit Inventory Item</h3>
        <InventoryItemForm
          item={item}
          onSubmit={onSubmit}
          buttonText="Save Item"
        />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
