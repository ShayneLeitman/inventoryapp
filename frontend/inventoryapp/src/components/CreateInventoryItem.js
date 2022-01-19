import React from 'react';
import { useNavigate } from "react-router-dom";
import { InventoryItemForm } from './InventoryItemForm';
import { createInventoryItem } from '../api/api';
export const CreateInventoryItem = () => {

    const navigate = useNavigate();

    const onSubmit = (async (data) => {
        await createInventoryItem(data);
        navigate("/");
    });

    return (
        <div className="container">
          <div className="mt3">
            <h3>Create Inventory Item</h3>
            <InventoryItemForm onSubmit={onSubmit} buttonText="Create Item"/>
          </div>
        </div>
      )
}