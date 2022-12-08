import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Dialog,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useModalState } from "../../hooks";
import { fetchShoppinglistrecipe } from "../../requests/recipe";
import { Shownrecipe } from "../Shownrecipe";


interface Shopping_list {
  name: string;
  id: number;
  handleDelete: (delid: number, name: string) => void;
  handleUpdate: (shid: number, name: string) => void;
}

export function ShoppingListButton(
  {
    name,
    id,
    handleDelete,
    handleUpdate
  }: Shopping_list) {
  const [buttonname, setbname] = useState("" + name);
  const { visible, onClose, onOpen } = useModalState();

  const handleChange =
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const data = event.target;
      setbname(data.value);
    };

  return (

    <div>
      <MuiButton
        style={{
          backgroundColor: "white",
          color: "black",
          fontSize: 14
        }} onClick={onOpen}
      >
        {name}
      </MuiButton >
      <Dialog
        fullWidth
        maxWidth="md"
        open={visible}
        onClose={() => {
          onClose();
        }}
        aria-labelledby="Shoppinglist"
      >
        <Shownrecipe
          onClose={onClose} name={name} id={id} handleDelete={handleDelete} handleUpdate={handleUpdate} />
      </Dialog></div>
  );
}
