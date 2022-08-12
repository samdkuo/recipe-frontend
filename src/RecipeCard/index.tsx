import React, { useState, useEffect, useCallback } from "react";
import { Header } from "semantic-ui-react";
import { Modal, Button, Box, Typography, TextField, badgeClasses } from "@mui/material"
import { useModalState } from "../hooks";
import { deleteIngrediant, deleteRecipe, fetchRecipeIngredients, updateRecipe } from "../requests/recipe";
import { RecipeForm } from "../RecipeForm";
import './styles.css'
import axios from 'axios'

interface RecipeCardProps {
  id: number;
  title: string;
  totalIngredients?: Ingredient[];
  cookTime?: number | undefined;
  image?: string;
  description?: string;
  instruction?: string;
  deleteRstate: (data: any) => void
  updateRstate: (data: any, recipe: number) => void
}

interface Ingredient {
  name: string;
  quantity: number;
  description: string;
  units: string;
}
export function RecipeCard({
  id,
  title,
  totalIngredients = [],
  cookTime,
  description,
  instruction,
  deleteRstate,
  updateRstate,
  image = "https://images.unsplash.com/photo-1454944338482-a69bb95894af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
}: RecipeCardProps) {
  const { visible, onClose, onOpen } = useModalState();
  const [ingredients, setIngredients] = React.useState([]);
  React.useEffect(() => {
    fetchRecipeIngredients(id).then((response: any) => {
      console.log(response);
      if (response) {
        setIngredients(response);
      };
      totalIngredients = [{ name: "bagel", quantity: 3, description: "", units: "" }];
      console.log(totalIngredients);
    });
  }, [id]);

  const handleClick = (delid: number) => {
    console.log("Delete " + delid)
    deleteRstate(delid);
    deleteRecipe(delid);
  }
  const deling = (delid: number, ing: string) => {
    console.log("Delete " + ing + "from recipe " + delid)
    deleteIngrediant(delid, ing);
  }

  const [isUpdating, setIsUpdating] = useState(false)
  const buttonHandler = () => {
    setIsUpdating(current => !current)
  }
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [value, setValue] = useState("");

  const [test, settest] = useState(<Button onClick={onOpen}>
    <div style={{ padding: 8 }}>
      {selectedImage ?
        <img
          style={{ width: "100%", height: 150 }}
          src={URL.createObjectURL(selectedImage)}//require("/Users/terrancekuo/src/recipe-frontend/src/emma\ soyjak\ forest.png")}
        />
        :
        <img
          style={{ width: "100%", height: 150 }}
          src={image}//require("/Users/terrancekuo/src/recipe-frontend/src/emma\ soyjak\ forest.png")}
        />
      }
      <Header type="title2">
        {title}
      </Header>
      <div>
        <label>{`Cook Time: ${cookTime}`}</label>
      </div>
    </div>
  </Button>);
  return (
    <div>
      {test}
      <Modal
        open={visible}
        onClose={() => { onClose(); if (isUpdating) buttonHandler(); }}
        aria-labelledby="recipe-name"
      >
        <>
          {!isUpdating ?
            <Box sx={style}>
              <Typography id="recipe-name" variant="h6" component="h2">
                {`${title}`}
              </Typography>
              {selectedImage ?
                <img
                  style={{ width: "100%", height: "50%" }}
                  src={URL.createObjectURL(selectedImage)}//require("/Users/terrancekuo/src/recipe-frontend/src/emma\ soyjak\ forest.png")}
                />
                :
                <img
                  style={{ width: "100%", height: "50%" }}
                  src={image}//require("/Users/terrancekuo/src/recipe-frontend/src/emma\ soyjak\ forest.png")}
                />
              }
              <div>
                <input
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    if (event.target.files != null) {
                      console.log(event.target.files[0]);
                      setSelectedImage(event.target.files[0]);
                      console.log(selectedImage);
                      console.log(URL.createObjectURL(event.target.files[0]))
                    }
                  }}
                />
              </div>
              <form
                encType="multipart/form-data"
                method="post"
              >
                <input type="file" name="myFile" />
                <input type="submit" value="upload" />
              </form>
              <Header type="title4">Description</Header>
              <Typography id="instruction" sx={{ mt: 2 }}>{`${description}`}</Typography>
              <Header type="title4">Ingredients</Header>
              <ul>
                {ingredients.map(({ name, quantity }) => (
                  <Typography id="instruction" sx={{ mt: 2 }}>
                    {name}: {quantity}
                  </Typography>
                ))}
              </ul>
              <TextField
                placeholder="Delete Ingredient"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    console.log(value);
                    deling(id, value);

                  }
                }}
                style={{ width: "100%", marginBottom: 20 }}
              />

              <Header class="instructions" type="title4">Instructions</Header>
              <Typography id="instruction" sx={{ mt: 2 }}>{`${instruction}`}</Typography>
              <div className="updatebutton">
                <Button style={{ position: 'absolute', width: '50%', height: '5%', backgroundColor: 'lightgreen' }} onClick={
                  buttonHandler
                }>
                  Update
                </Button>
              </div>
              <div className="deletebutton">
                <Button style={{
                  position: 'absolute', width: '50%', height: '5%', backgroundColor: 'red', color: 'black'
                }} onClick={() => { handleClick(id) }}>
                  Delete
                </Button>
              </div>
            </Box>
            :

            <Box className="modalBox" sx={{ position: "absolute", overflowY: "scroll", maxHeight: "115%", marginLeft: 20, width: 800, marginTop: -13 }}>
              <RecipeForm addRecipe={deleteRecipe} updateRstate={updateRstate} update={true} rid={id} name={title}
                description={description} instruction={instruction} cooktime={cookTime} handleIngredientSubmit={function (data: any): void {
                  throw new Error("Function not implemented.");
                }} />
            </Box>
          }
        </>

      </Modal>
    </div>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'scroll',
  p: 4,
};