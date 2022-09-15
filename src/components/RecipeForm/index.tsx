import React, { useCallback, useState, useMemo } from "react";
import { colors } from "../../theme/colors";
import {
  deleteIngrediant,
  fetchRecipeIngredients,
  postimage,
  postIngredient,
  postRecipe,
  postRecipeimage,
  updateRecipe,
  updateRecipeimage,
} from "../../requests/recipe";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { Http, PhotoCamera } from "@mui/icons-material";
import { useModalState } from "../../hooks";
import { Button } from "../Button";
import { IngredientInput } from "./IngredientInput";
import { RecipeFormProps, labels, IngredientProps } from "./types";
import { IngredientButton } from "../IngredientButton"
import { config } from "process";
import configData from "../../config.json";

export function RecipeForm({
  addRecipe,
  updateRecipeState,
  onClose,
  update,
  rid,
  name,
  description,
  instruction,
  cooktime,
  image,
}: RecipeFormProps) {
  const initialValues = useMemo(() => {
    return {
      name: name ? name : "",
      description: description ? description : "",
      instruction: instruction ? instruction : "",
      cooktime: cooktime ? cooktime : "",
      label: "",
    };
  }, [name, description, instruction, cooktime]);

  const [ingredientsList, setIngredientsList] = useState<
    Array<IngredientProps>
  >([]);
  const [recipe, setRecipe] = useState(initialValues);

  const handleClose = useCallback(() => {
    onClose();
    setIngredientsList([]);
    setRecipe(initialValues);
  }, [onClose, initialValues]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const data = event.target;
      setRecipe({ ...recipe, [data.name]: data.value });
    },
    [recipe]
  );

  const handleIngredientSubmit = useCallback(
    (ingredient: IngredientProps) => {
      setIngredientsList([...ingredientsList, ingredient]);
    },
    [ingredientsList]
  );

  const handleClick = (rid: number, delid: string) => {
    const newlist = ingredients.filter((item: { name: string; }) => item.name !== delid);
    setIngredients(newlist);
    deleteIngrediant(rid, delid)
  };
  const handletempClick = (delid: string) => {
    const newlist = ingredients.filter((item: { name: string; }) => item.name !== delid);
    setIngredients(newlist);
  };

  const handleSubmit = useCallback(() => {
    const data = { ...recipe, Label: { id: recipe.label } };
    console.log(data);
    if (!update) {
      postRecipe(data).then((response: any) => {
        console.log(response);
        if (!selectedImage) {
          addRecipe({ ...data, id: response, image: image });
          ingredientsList.map((ingredient) => {
            postIngredient(ingredient, response);
            console.log("ingredient posted in form");
          });
        } else {
          postimage(selectedImage).then((imageurl: string) => {
            console.log(imageurl);
            if (imageurl) {
              addRecipe({ ...data, id: response, image: imageurl });
              ingredientsList.map((ingredient) => {
                postIngredient(ingredient, response);
                console.log("ingredient posted in form");
              });
              postRecipeimage(response, imageurl);
            }
          });
        }
      });
    } else {
      console.log(selectedImage);
      console.log("is updating " + update);
      console.log(data);
      ingredientsList.map((ingridient) => {
        postIngredient(ingridient, rid);
        console.log("ingredient posted in form");
      });
      postimage(selectedImage).then((imageurl: string) => {
        console.log(imageurl);
        if (imageurl) {
          updateRecipeState({ ...data, image: imageurl }, rid);
          updateRecipeimage(rid, imageurl);
        } else {
          updateRecipeState(data, rid);
        }
      });
      updateRecipe(data, rid);
    }
    handleClose();
  }, [
    recipe,
    ingredientsList,
    rid,
    update,
    addRecipe,
    updateRecipeState,
    handleClose,
  ]);

  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [ingredients, setIngredients] = React.useState([]);
  React.useEffect(() => {
    fetchRecipeIngredients(rid).then((response: any) => {
      console.log(response);
      if (response) {
        setIngredients(response);
      }
    });
  }, [rid]);

  return (
    <div style={{ alignSelf: "flex-end" }}>
      <DialogTitle id="scroll-dialog-title">
        {!update ? ("Create New Recipe")
          :
          ("Update Recipe")
        }

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file"
            onChange={(event) => {
              if (event.target.files != null) {
                console.log(event.target.files);
                setSelectedImage(event.target.files[0]);
                console.log(selectedImage);
              }
            }}
          />
          <PhotoCamera />
        </IconButton>
        {selectedImage ? (
          <img
            style={{ width: "25%", height: 150 }}
            src={URL.createObjectURL(selectedImage)}
          />
        ) : (
          <img
            style={{ width: "25%", height: 150 }}
            src={configData.SERVER_URL + image}
          />
        )}
      </DialogTitle>
      <DialogContent
        style={{ display: "flex", flexDirection: "column", paddingTop: 8 }}
      >
        <Stack spacing={2}>
          <TextField
            name="name"
            id="name"
            variant="outlined"
            label="Name"
            value={recipe.name}
            onChange={handleChange}
            type="text"
            fullWidth
          />

          <TextField
            name="description"
            id="description"
            variant="outlined"
            label="Description"
            value={recipe.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <IngredientInput handleIngredientSubmit={handleIngredientSubmit} />

          <ul>
            {ingredients.map(({ name, quantity, description, units }) => (
              <Typography id="instruction" sx={{ mt: 2 }}>
                <Button>
                  <IngredientButton
                    name={name}
                    quantity={quantity}
                    description={description}
                    units={units}
                  />
                  <Button
                    onClick={() => {
                      handleClick(rid, name);
                    }}>
                    Delete
                  </Button>
                </Button>
              </Typography>
            ))}
          </ul>
          {ingredientsList.map((ingredient, index) => (
            <p
              key={index}
            >{<
              Typography id="instruction" sx={{ mt: 2 }}>
              <Button>
                <IngredientButton
                  name={ingredient.name}
                  quantity={ingredient.quantity}
                  description={ingredient.description}
                  units={ingredient.units}
                />
                <Button
                  onClick={() => {
                    handletempClick(name);
                  }}>
                  Delete
                </Button>
              </Button>
            </Typography>
              }</p>
          ))}

          <TextField
            name="instruction"
            id="instruction"
            variant="outlined"
            label="Instructions"
            value={recipe.instruction}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            name="cooktime"
            id="cooktime"
            variant="outlined"
            label="Cooktime (mins)"
            value={recipe.cooktime}
            onChange={handleChange}
            type="number"
            fullWidth
          />
          <TextField
            name="label"
            id="label"
            label="Label"
            value={recipe.label}
            onChange={handleChange}
            select
            fullWidth
          >
            {labels.map((label, index) => (
              <MenuItem key={index} value={label.value}>
                {label.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </div>
  );
}
