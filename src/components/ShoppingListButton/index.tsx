import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Dialog,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useModalState } from "../../hooks";
import { fetchrecipeimage, fetchShoppinglistingredients, fetchShoppinglistrecipe } from "../../requests/recipe";
import { Shownrecipe } from "../Shownrecipe";
import configData from "../../config.json";


interface Shopping_list {
  name: string;
  id: number;
  user_id: number;
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

  interface Image {
    recipe_id: number;
    image_url: string;
  }

  const [shopping_lists_recipe, setshopping_lists_recipe] = useState<
    RecipeProps[]
  >([]);

  const [shopping_lists_ingredients, setshopping_lists_ingredients] = useState<
    IngredientProps[]
  >([]);

  React.useEffect(() => {
    fetchrecipeimage().then((images: Image[]) => {
      if (images) {
        console.log(images);
        fetchShoppinglistrecipe(id).then((response: any) => {
          if (response) {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
              response[i].image = configData.default_image;
              for (let j = 0; j < images.length; j++) {
                if (response[i].id == images[j].recipe_id) {
                  response[i].image = images[j].image_url;
                }
              }
            }
            fetchShoppinglistingredients(id).then((list: any) => {
              if (list) {
                console.log(list);
                setshopping_lists_ingredients(list);
              }
            })
            setshopping_lists_recipe(response);
          }
        });
      }
    })
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
          onClose={onClose} name={name} id={id} recipelist={shopping_lists_recipe} handleDelete={handleDelete} ingredientlist={shopping_lists_ingredients} handleUpdate={handleUpdate} />
      </Dialog></div>
  );
}
