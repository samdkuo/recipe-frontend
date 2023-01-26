import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Checkbox,
  DialogTitle,
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
  const [listname, setname] = useState("");
  const [editname, seteditname] = useState(true);


  const updateName = (updatedname: string) => {
    console.log(updatedname);
    updateShoppinglist(updatedname, id).then((response: any) => {
      if (response) {
        handleUpdate(id, updatedname);
      }
    })
  }

  const deleteList = () => {
    handleDelete(id, name);
    deleteShoppinglist(id);
  };

  const showlist = () => {
    setlistswitch(!listswitch);
  };
  const handleChange =
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const data = event.target;
      setname(data.value);
    };

  const handleKeyDown = (ev: { key: string; }) => {
    console.log(`Pressed keyCode ${ev.key}`);
    if (ev.key === 'Enter') {
      updateName(listname);
    }
  }
  const handlepress =
    () => {
      seteditname(!editname);
    };
  return (
    <>
      <Typography id="instruction" fontSize={24} sx={{ mt: 2 }}>
        {name}
      </Typography>
      <DialogTitle>
        {editname ?
          <MuiButton
            style={{
              position: "sticky",
              left: "0%",
              width: "20%",
              height: "5%",
              backgroundColor: "#67c4fc",
              color: "white",
              fontSize: 14
            }}
            onClick={() => {
              handlepress();
            }}
          >
            Edit Name
          </MuiButton>
          :
          <TextField
            name="name"
            id="name"
            variant="outlined"
            label="Name"
            value={listname}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text" />}
        <MuiButton
          style={{
            position: "sticky",
            left: "40%",
            width: "20%",
            height: "5%",
            backgroundColor: "#67c4fc",
            color: "white",
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
            position: "sticky",
            left: "90%",
            width: "20%",
            height: "5%",
            backgroundColor: "#67c4fc",
            color: "white",
            fontSize: 14
          }}
          onClick={() => {
            showlist();
          }}
        >
          {listswitch ?
            "View Ingredients"
            :
            "View Recipes"}
        </MuiButton>
      </DialogTitle>
      <div>
        {listswitch ?
          <ul>
            <div>
              Recipes:
            </div>
            {recipelist.map(({ id, name, cooktime, description, label, instruction, image }) => (
              <MuiButton
                style={{
                  position: "sticky",
                  marginRight: 5,
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
                  isrecipelist={true}
                  labelid={label.id} deleteRstate={function (data: any): void {
                    throw new Error("Function not implemented.");
                  }} updateRecipeState={function (data: any, recipe: number): void {
                    throw new Error("Function not implemented.");
                  }} updateRecipeImage={function (recipe: number, imagepath: string): void {
                    throw new Error("Function not implemented.");
                  }} />
              </MuiButton>
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
                    color: "#67c4fc",
                    fontSize: 14
                  }}
                >
                  {name}: {quantity} {adjective} {unit}
                  <Checkbox />
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
