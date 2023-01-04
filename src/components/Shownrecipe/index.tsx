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
import configData from "../../config.json";
import { RecipeCard } from "../RecipeCard";


interface Shopping_list {
  name: string;
  id: number;
  recipelist: RecipeProps[];
  ingredientlist: IngredientProps[];
  onClose: VoidFunction;
  handleDelete: (delid: number, name: string) => void;
  handleUpdate: (shid: number, name: string) => void;
}

export interface RecipeProps {
  id: number;
  name: string;
  description: string;
  instruction: string;
  cooktime: number;
  label: label;
  image: string;
}

export interface IngredientProps {
  name: string;
  quantity: string;
  adjective: string;
  unit: string;
}

interface label {
  id: number;
  name: string;
}


interface Recipeslist {
  recipe_id: number;
}


export function Shownrecipe(
  {
    name,
    id,
    recipelist,
    ingredientlist,
    onClose,
    handleDelete,
    handleUpdate
  }: Shopping_list) {

  const [listswitch, setlistswitch] = useState(true);


  const updateName = (updatedname: string) => {
    console.log(updatedname);
    handleUpdate(id, updatedname);
    updateShoppinglist(updatedname, id);
  };

  const deleteList = () => {
    handleDelete(id, name);
    deleteShoppinglist(id);
  };

  const showlist = () => {
    setlistswitch(!listswitch);
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

      <MuiButton
        style={{
          backgroundColor: "white",
          color: "black",
          fontSize: 14
        }}
        onClick={() => {
          showlist();
        }}
      >
        View Ingredients
      </MuiButton>
      <div>
        {listswitch ?
          <ul>
            Recipes:
            {recipelist.map(({ id, name, cooktime, description, label, instruction, image }) => (
              <><Typography id="instruction" sx={{ mt: 2 }}>
                <MuiButton
                  style={{
                    position: "sticky",
                    right: 0,
                    backgroundColor: "#67c4fc",
                    color: "white",
                    fontSize: 14
                  }}
                >
                  <RecipeCard
                    id={id}
                    title={name}
                    cookTime={cooktime}
                    image={image}
                    description={description}
                    instruction={instruction}
                    labelname={label.name}
                    labelid={label.id} deleteRstate={function (data: any): void {
                      throw new Error("Function not implemented.");
                    }} updateRecipeState={function (data: any, recipe: number): void {
                      throw new Error("Function not implemented.");
                    }} updateRecipeImage={function (recipe: number, imagepath: string): void {
                      throw new Error("Function not implemented.");
                    }} />
                </MuiButton>
              </Typography></>
            ))}
          </ul>
          :
          <ul>
            Ingredients:
            {ingredientlist.map(({ name, quantity, adjective, unit }) => (
              <Typography id="instruction" sx={{ mt: 2 }}>
                <MuiButton
                  style={{
                    position: "sticky",
                    right: 0,
                    backgroundColor: "#67c4fc",
                    color: "white",
                    fontSize: 14
                  }}
                >
                  {name}: {quantity} {adjective} {unit}
                </MuiButton>
              </Typography>
            ))}
          </ul>
        }
      </div>

      <MuiButton
        style={{
          position: "sticky",
          right: 0,
          backgroundColor: "#67c4fc",
          color: "white",
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
