import React, { useCallback, useState, useMemo } from "react";
import { colors } from "../../theme/colors";
import {
  postIngredient,
  postRecipe,
  updateRecipe,
} from "../../requests/recipe";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";

import { useModalState } from "../../hooks";
import { Button } from "../Button";
import { IngredientInput } from "./IngredientInput";
import { RecipeFormProps, labels, IngredientProps } from "./types";

export function RecipeForm({
  addRecipe,
  updateRecipeState,
  update,
  rid,
  name,
  description,
  instruction,
  cooktime,
}: RecipeFormProps) {
  const { visible, onClose, onOpen } = useModalState();
  const initialValues = useMemo(() => {
    return {
      name: name ? name : "",
      description: description ? description : "",
      instructions: instruction ? instruction : "",
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

  const handleSubmit = useCallback(() => {
    const data = { ...recipe, Label: { id: recipe.label } };
    console.log(data);
    if (!update) {
      postRecipe({ data }).then((response: any) => {
        console.log(response);
        addRecipe({ ...data, id: response });
      });
    } else {
      console.log(update);
      console.log(data);
      updateRecipeState(data, rid);
      updateRecipe(data, rid);
    }

    handleClose();
  }, [recipe, rid, update, addRecipe, updateRecipeState, handleClose]);

  return (
    <div style={{ alignSelf: "flex-end" }}>
      <Button
        style={{ width: 148, marginBottom: 16 }}
        variant="contained"
        onClick={onOpen}
      >
        Add Recipe +
      </Button>
      <Dialog open={visible} onClose={handleClose}>
        <DialogTitle id="scroll-dialog-title">Create New Recipe</DialogTitle>
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
              rows={5}
              fullWidth
            />
            <IngredientInput handleIngredientSubmit={handleIngredientSubmit} />
            {ingredientsList.map((ingredient, index) => (
              <p
                key={index}
              >{`${ingredient.name}: ${ingredient.description} ${ingredient.quantity} ${ingredient.units}`}</p>
            ))}

            <TextField
              name="instructions"
              id="instructions"
              variant="outlined"
              label="Instructions"
              value={recipe.instructions}
              onChange={handleChange}
              multiline
              rows={4}
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
      </Dialog>
    </div>
  );
}
