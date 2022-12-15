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
  user_id: number;
  handleDelete: (delid: number, name: string) => void;
  handleUpdate: (shid: number, name: string) => void;
}

export interface RecipeProps {
  name: string;
  description: string;
  instruction: string;
  cooktime: string;
  label: string;
}

export function ShoppingListButton(
  {
    name,
    id,
    user_id,
    handleDelete,
    handleUpdate
  }: Shopping_list) {
  const [buttonname, setbname] = useState("" + name);
  const { visible, onClose, onOpen } = useModalState();

  const [shopping_lists_recipe, setshopping_lists_recipe] = useState<
    RecipeProps[]
  >([]);

  React.useEffect(() => {
    fetchShoppinglistrecipe(id).then((response: any) => {
      if (response) {
        console.log(response);
        setshopping_lists_recipe(response);
      }
    });
  }, [id]);

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
          onClose={onClose} name={name} id={id} recipelist={shopping_lists_recipe} handleDelete={handleDelete} handleUpdate={handleUpdate} />
      </Dialog></div>
  );
}
