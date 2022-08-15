import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Formik } from "formik";
import { colors } from "../theme/colors";
import { postIngredient, postRecipe, updateRecipe } from "../requests/recipe";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";

import { useModalState } from "../hooks";
import { Button } from "../components";

interface RecipeFormProps {
  addRecipe: (data: any) => void;
  updateRstate: (data: any, rid: number) => void;
  update: boolean;
  rid: number;
  name: any;
  description: any;
  instruction: any;
  cooktime: any;
}
interface Ingredient {
  name: string;
  quantity: number;
  description: string;
  units: string;
}
interface Recipe {
  name: string;
  description: string;
  ingredients: Array<Ingredient>;
  instruction: string;
}

function IngredientInput({ rid }: RecipeFormProps) {
  const handlingSubmit = (values: Ingredient) => {
    console.log(values.name);
    console.log(values.quantity);
    console.log(values.description);
    console.log(rid);
    postIngredient(values, rid);
  };
  return (
    <div>
      <label>Add Ingredients</label>

      <Formik
        initialValues={{ name: "", quantity: 0, units: "", description: "" }}
        onSubmit={handlingSubmit}
      >
        {({ handleChange, handleBlur, values }) => (
          <Stack
            direction="row"
            spacing={1}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TextField
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              id="name"
              label="name"
            />
            <TextField
              onChange={handleChange("description")}
              onBlur={handleBlur("description")}
              id="description"
              label="description"
            />
            <TextField
              id="quantity"
              label="quantity"
              onChange={handleChange("quantity")}
              onBlur={handleBlur("quantity")}
            />

            <TextField
              id="units"
              label="units"
              select
              onChange={handleChange("units")}
              onBlur={handleBlur("units")}
            ></TextField>

            <Button onClick={() => handlingSubmit(values)}>Add</Button>
          </Stack>
        )}
      </Formik>
    </div>
  );
}

export function RecipeForm({
  addRecipe,
  updateRstate,
  name,
  update,
  rid,
  description,
  instruction,
  cooktime,
}: RecipeFormProps) {
  const { visible, onClose, onOpen } = useModalState();
  const [ingredientsList, setIngredientsList] = React.useState<
    Array<Ingredient>
  >([]);

  const handleIngredientSubmit = useCallback(
    (values: Ingredient) => {
      setIngredientsList([...ingredientsList, values]);
    },
    [ingredientsList]
  );

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  const onSubmit = (data: any) => {
    switch (data.Label) {
      case "Breakfast":
        data.Label = { id: 1 };
        break;
      case "Lunch":
        data.Label = { id: 2 };
        break;
      default:
        data.Label = { id: 3 };
        break;
    }
    console.log(data.Label);
    if (!update) {
      postRecipe(data).then((response: any) => {
        console.log(response);
        const recipe = { ...data, id: response };
        console.log(recipe);
        addRecipe(recipe);
      });
    } else {
      console.log(update);
      console.log(data);
      updateRstate(data, rid);
      updateRecipe(data, rid);
    }
  };
  return (
    <div style={{ alignSelf: "flex-end" }}>
      <Button
        style={{ width: 148, marginBottom: 16 }}
        variant="contained"
        onClick={onOpen}
      >
        Add Recipe +
      </Button>
      <Dialog open={visible} onClose={onClose}>
        <DialogTitle id="scroll-dialog-title">Create New Recipe</DialogTitle>
        <DialogContent
          style={{ display: "flex", flexDirection: "column", paddingTop: 8 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                id="name"
                variant="outlined"
                label="Name"
                type="text"
                fullWidth
              />
              <TextField
                id="description"
                variant="outlined"
                label="Description"
                multiline
                rows={5}
                fullWidth
              />
              {
                <IngredientInput
                  rid={rid}
                  addRecipe={function (data: any): void {}}
                  updateRstate={function (data: any, rid: number): void {}}
                  update={false}
                  name={undefined}
                  description={undefined}
                  instruction={undefined}
                  cooktime={undefined}
                />
              }

              <TextField
                id="instructions"
                variant="outlined"
                label="Instructions"
                multiline
                rows={4}
                fullWidth
              />
              <TextField
                id="cooktime"
                variant="outlined"
                label="Cooktime (mins)"
                type="number"
                fullWidth
              />
              <TextField
                id="label"
                variant="outlined"
                label="Label"
                select
                fullWidth
              >
                {["Breakfast", "Lunch", "Dinner"].map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <input type="submit" />
        </DialogActions>
      </Dialog>
    </div>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
