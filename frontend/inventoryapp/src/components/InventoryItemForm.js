import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export const InventoryItemForm = ({ item, onSubmit, buttonText }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: item ? item : "",
  });
  const submitHandler = handleSubmit(
    (data) => {
      onSubmit(data);
    },
    (err) => {
      console.log(err);
    }
  );

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="name">Item Name:*</label>
        <input
          type="text"
          name="name"
          id="name"
          {...register("name", { required: true })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Item Description:</label>
        <input
          type="text"
          name="description"
          id="description"
          {...register("description")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="inventorycount">Inventory Count:*</label>
        <input
          type="text"
          name="inventorycount"
          id="inventorycount"
          {...register("inventorycount", { required: true })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          name="category"
          id="category"
          {...register("category")}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          {buttonText}
        </button>
      </div>
    </form>
  );
};
