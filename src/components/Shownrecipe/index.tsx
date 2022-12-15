import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  TextField,
  Typography,
} from "@mui/material";
import { toNamespacedPath } from "path";
import React from "react";
import { useState } from "react";
import { deleteShoppinglist, fetchShoppinglistrecipe, updateShoppinglist } from "../../requests/recipe";
import { label } from "../RecipeForm/types";


interface Shopping_list {
  name: string;
  id: number;
  recipelist: RecipeProps[];
  onClose: VoidFunction;
  handleDelete: (delid: number, name: string) => void;
  handleUpdate: (shid: number, name: string) => void;
}

interface Recipe {
  filter(recipe: Recipe): React.SetStateAction<Recipe[]>;
  id: number;
  name: string;
  description: string;
  instruction: string;
  cooktime: number;
  image: string;
  label: label;
}

export interface RecipeProps {
  name: string;
  description: string;
  instruction: string;
  cooktime: string;
  label: string;
}

interface Recipeslist {
  recipe_id: number;
}

export function Shownrecipe(
  {
    name,
    id,
    recipelist,
    onClose,
    handleDelete,
    handleUpdate
  }: Shopping_list) {

  const [recipes, setrecipes] = useState<
    Recipeslist[]
  >([]);

  const [buttonname, setbname] = useState("" + name);

  const handleChange =
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const data = event.target;
      setbname(data.value);
    };

  const updateName = (updatedname: string) => {
    console.log(updatedname);
    handleUpdate(id, updatedname);
    updateShoppinglist(updatedname, id);
  };

  const deleteList = () => {
    handleDelete(id, name);
    deleteShoppinglist(id);
  };

  return (
    <>
      {name}
      <MuiButton
        style={{
          backgroundColor: "white",
          color: "black",
          fontSize: 14
        }}
        onClick={() => {
          updateName("New Name");
        }}
      >
        Edit Name
      </MuiButton>
      <MuiButton
        style={{
          backgroundColor: "white",
          color: "black",
          fontSize: 14
        }}
        onClick={() => {
          deleteList();
        }}
      >
        Delete List
      </MuiButton>
      Recipes:
      <ul>
        {recipelist.map(({ name }) => (
          <Typography id="instruction" sx={{ mt: 2 }}>
            {name}
          </Typography>
        ))}
      </ul>
      <MuiButton
        style={{
          backgroundColor: "white",
          color: "black",
          fontSize: 14
        }}
        onClick={() => {
          onClose();
        }}
      >
        Cancel
      </MuiButton></>
  );
}
