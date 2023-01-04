import React, { useState, useEffect, useCallback, KeyboardEventHandler } from "react";
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
  MenuItem,
  Checkbox,
  SelectChangeEvent,
} from "@mui/material";
import { useModalState } from "../../hooks";
import {
  deleteIngrediant,
  deleteRecipe,
  deleteRecipeImage,
  deleteshoppingrecipe,
  fetchRecipeIngredients,
  fetchShoppinglist,
  fetchShoppinglistrecipe,
  postimage,
  postIngredient,
  postRecipeimage,
  postshoppinglist,
  postshoppingrecipe,
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
  labelname: string;
  labelid: number;
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

interface Shopping_list_recipe {
  id: number;
  shopping_list_id: number;
  recipe_id: number;
}

interface Shopping_list {
  name: string;
  id: number;
}
export function RecipeCard({
  id,
  title,
  cookTime,
  description,
  instruction,
  labelname,
  labelid,
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
  const [shopping_lists, setshopping_lists] = useState<
    Shopping_list[]
  >([]);
  const [shopping_lists_recipe, setshopping_lists_recipe] = useState<
    Shopping_list_recipe[]
  >([]);
  const [liststr, setliststr] = useState("");

  React.useEffect(() => {
    fetchRecipeIngredients(id).then((response: any) => {
      console.log(id);
      console.log(response);
      if (response) {
        setIngredients(response);
      }
    });
    fetchShoppinglist().then((response: any) => {
      if (response) {
        console.log(response);
        setshopping_lists(response);
      }
    });
    fetchShoppinglistrecipe(id).then((response: any) => {
      if (response) {
        console.log(response);
        setshopping_lists_recipe(response);
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

  const updatestr = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setliststr(event.target.value);
  };


  const handleKeyDown = (ev: { key: string; }) => {
    console.log(`Pressed keyCode ${ev.key}`);
    if (ev.key === 'Enter') {
      postshoppinglist(liststr).then((response: any) => {
        if (response) {
          console.log(response);
          addtoList(response);
          fetchShoppinglist().then((response: any) => {
            if (response) {
              console.log(response);
              setshopping_lists(response);
            }
          });
        }
      });
    }
  }

  const addtoList = (shid: number) => {
    let bool = false;
    let shrid = 0;
    shopping_lists_recipe.some(element => {
      if (element.shopping_list_id === shid) {
        console.log(element.recipe_id + " is part of " + element.shopping_list_id);
        bool = true;
        shrid = element.id;
      }
    });
    if (bool) {
      deleteshoppingrecipe(shrid).then((response: any) => {
        if (response) {
          console.log(response);
        }
      })
      const newlist2 = shopping_lists_recipe.filter((item: { shopping_list_id: number; }) => item.shopping_list_id !== shid);
      console.log(newlist2);
      setshopping_lists_recipe(newlist2)
    } else {
      postshoppingrecipe(shid, id).then((response: any) => {
        if (response) {
          console.log(response);
          setshopping_lists_recipe([...shopping_lists_recipe, { id: response, shopping_list_id: shid, recipe_id: id }])
        }
      })
    }
  };

  const isFound = (shid: number) => {
    let bool = false;
    shopping_lists_recipe.some(element => {
      if (element.shopping_list_id === shid) {
        console.log(element.recipe_id + " is part of " + element.shopping_list_id);
        bool = true;
      }

    });
    return bool;
  };

  const [isUpdating, setIsUpdating] = useState(false);
  const buttonHandler = () => {
    setIsUpdating((current) => !current);
  };
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  interface label {
    name: string;
    id: number;
  }
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
            <label>{`Total Time: ${cookTime} min`}</label>
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
                  {localStorage.getItem("jwt") ?
                    <TextField
                      name="shopping_list"
                      id="shopping_list"
                      label="Shopping_list"
                      select
                      style={{
                        position: "sticky",
                        left: "45%",
                        width: "20%",
                        height: "5%",
                        backgroundColor: "#67c4fc",
                        color: "white"
                      }}
                    >
                      <MenuItem>
                        <TextField
                          name="new_list"
                          id="new_list"
                          variant="outlined"
                          label="New_list"
                          value={liststr}
                          onChange={updatestr}
                          onKeyDown={handleKeyDown}
                        />
                      </MenuItem>
                      {shopping_lists.map((label) => (
                        <MenuItem key={label.id} value={label.id}>
                          <Checkbox checked={isFound(label.id)}
                            onChange={() => { addtoList(label.id) }} />
                          {label.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    : null
                  }
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


              <Header class="Label" type="title4">
                Label
              </Header>
              <Typography
                id="label"
                sx={{ mt: 2 }}
              >{`${labelname}`}</Typography>
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
              labelid={labelid}
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