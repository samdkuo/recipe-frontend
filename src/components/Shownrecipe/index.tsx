import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { deleteShoppinglist, fetchShoppinglistrecipe, updateShoppinglist } from "../../requests/recipe";
import { label } from "../RecipeForm/types";


interface Shopping_list {
  name: string;
  id: number;
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

interface Shopping_list_recipe {
  id: number;
  shopping_list_id: number;
  recipe_id: number;
}

interface Recipeslist {
  recipe_id: number;
}

export function Shownrecipe(
  {
    name,
    id,
    onClose,
    handleDelete,
    handleUpdate
  }: Shopping_list) {

  const [shopping_lists_recipe, setshopping_lists_recipe] = useState<
    Shopping_list_recipe[]
  >([]);
  React.useEffect(() => {
    fetchShoppinglistrecipe(id).then((response: any) => {
      if (response) {
        console.log(response);
        setshopping_lists_recipe(response);
      }
    });
  }, [id]);
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
    <><MuiButton
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
      {id}
      <ul>
        {shopping_lists_recipe.map(({ shopping_list_id, recipe_id }) => (
          <Typography id="instruction" sx={{ mt: 2 }}>
            {shopping_list_id}: {recipe_id}
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
