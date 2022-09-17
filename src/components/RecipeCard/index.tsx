import React, { useState, useEffect, useCallback } from "react";
import { Header } from "semantic-ui-react";
import {
  Modal,
  Button,
  Box,
  Typography,
  TextField,
  badgeClasses,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useModalState } from "../../hooks";
import {
  deleteIngrediant,
  deleteRecipe,
  deleteRecipeImage,
  fetchRecipeIngredients,
  postimage,
  postIngredient,
  postRecipeimage,
  updateRecipe,
} from "../../requests/recipe";
import { RecipeForm } from "../RecipeForm";
import "./styles.css";
import axios from "axios";

import configData from "../../config.json";

interface RecipeCardProps {
  id: number;
  title: string;
  totalIngredients?: Ingredient[];
  cookTime?: number | undefined;
  image: string;
  description?: string;
  instruction?: string;
  deleteRstate: (data: any) => void;
  updateRecipeState: (data: any, recipe: number) => void;
  updateRecipeImage: (recipe: number, imagepath: string) => void;
}

interface Ingredient {
  name: string;
  quantity: number;
  adjective: string;
  unit: string;
}
export function RecipeCard({
  id,
  title,
  cookTime,
  description,
  instruction,
  deleteRstate,
  updateRecipeState,
  updateRecipeImage,
  // image = require("/Users/terrancekuo/src/recipe-frontend/src/necoarc.jpeg")
  image,
}: RecipeCardProps) {
  const { visible, onClose, onOpen } = useModalState();
  const [ingredients, setIngredients] = useState<
    Array<Ingredient>
  >([]);
  React.useEffect(() => {
    fetchRecipeIngredients(id).then((response: any) => {
      console.log(response);
      if (response) {
        setIngredients(response);
      }
    });
  }, [id]);

  const handleClick = (delid: number) => {
    console.log("Delete " + delid);
    deleteRstate(delid);
    deleteRecipe(delid);
    deleteRecipeImage(delid);
  };

  const updateIngState = useCallback(
    (ingr: Ingredient[]) => {
      setIngredients(ingr);
    },
    [setIngredients]
  );

  const [isUpdating, setIsUpdating] = useState(false);
  const buttonHandler = () => {
    setIsUpdating((current) => !current);
  };
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  return (
    <div>
      <Button onClick={onOpen}>
        <div>
          {selectedImage ? (
            <img
              style={{ width: 150, height: 150 }}
              src={URL.createObjectURL(selectedImage)} //require("/Users/terrancekuo/src/recipe-frontend/src/emma\ soyjak\ forest.png")}
            />
          ) : (
            <img
              style={{ width: 150, height: 150 }}
              src={configData.SERVER_URL + image} //require("/Users/terrancekuo/src/recipe-frontend/src/emma\ soyjak\ forest.png")}
            />
          )}
          <Header type="title2">{title}</Header>
          <div>
            <label>{`Cook Time: ${cookTime}`}</label>
          </div>
        </div>
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={visible}
        onClose={() => {
          onClose();
          if (isUpdating) buttonHandler();
        }}
        aria-labelledby="recipe-name"
      >
        <DialogContent style={{ display: "flex", flexDirection: "column", paddingTop: 8 }}>

          {!isUpdating ? (
            <Box>
              <Typography id="recipe-name" variant="h6" component="h2">
                {`${title}`}
                <DialogTitle>
                  <Button
                    style={{
                      position: "sticky",
                      left: "0%",
                      width: "20%",
                      height: "5%",
                      backgroundColor: "#67c4fc",
                      color: "white",
                    }}
                    onClick={buttonHandler}
                  >
                    Update
                  </Button>
                  <Button
                    style={{
                      position: "sticky",
                      left: "25%",
                      width: "20%",
                      height: "5%",
                      backgroundColor: "#67c4fc",
                      color: "white",
                    }}
                    onClick={() => {
                      handleClick(id);
                    }}
                  >
                    Delete
                  </Button>
                </DialogTitle>
              </Typography>
              {selectedImage ? (
                <img
                  style={{ width: 150, height: 150 }}
                  src={URL.createObjectURL(selectedImage)} //require("/Users/terrancekuo/src/recipe-frontend/src/emma\ soyjak\ forest.png")}
                />
              ) : (
                <img
                  style={{ width: 150, height: 150 }}
                  src={configData.SERVER_URL + image} //require("/Users/terrancekuo/src/recipe-frontend/src/emma\ soyjak\ forest.png")}
                />
              )}
              <Header type="title4">Description</Header>
              <Typography
                id="instruction"
                sx={{ mt: 2 }}
              >{`${description}`}</Typography>
              <Header type="title4">Ingredients</Header>
              <ul>
                {ingredients.map(({ name, quantity, adjective, unit }) => (
                  <Typography id="instruction" sx={{ mt: 2 }}>
                    {name}: {adjective} {quantity} {unit}
                  </Typography>
                ))}
              </ul>
              <Header class="instructions" type="title4">
                Instructions
              </Header>
              <Typography
                id="instruction"
                sx={{ mt: 2 }}
              >{`${instruction}`}</Typography>
            </Box>
          ) : (<>
            <RecipeForm
              addRecipe={deleteRecipe}
              updateRecipeState={updateRecipeState}
              updateRecipeImage={updateRecipeImage}
              updateIngState={updateIngState}
              onClose={onClose}
              update={true}
              buttonHandler={buttonHandler}
              rid={id}
              name={title}
              image={image}
              description={description}
              instruction={instruction}
              cooktime={cookTime} />
          </>

          )
          }
        </DialogContent>
      </Dialog>
    </div >
  );
}