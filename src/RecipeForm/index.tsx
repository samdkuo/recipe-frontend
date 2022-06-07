import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Formik } from "formik";
import { colors } from "../theme/colors";
import { getmaxId, postRecipe } from "../requests/recipe";
import { Toolbar, TextField, Button } from "@mui/material"
import './styles.css'

interface RecipeFormProps { addRecipe: (data: any) => void }

const IngredientInput = (handleSubmit: any) => {
  const handlingSubmit = (values: Ingredient) => {
    console.log(values.name);
    console.log(values.quantity);
  };
  return (
    <div>
      <Toolbar>Add Ingredients</Toolbar>

      <Formik
        initialValues={{ name: "", quantity: "" }}
        onSubmit={handlingSubmit}
      >
        {({ handleChange, handleBlur, values }) => (
          <div
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextField
              required
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              id="name"
              label="name"
              defaultValue=""
            />

            <TextField
              required
              onChange={handleChange("quantity")}
              onBlur={handleBlur("quantity")}
              id="quantity"
              label="quantity"
              defaultValue=""
            />

            <Button onClick={() => handlingSubmit(values)}>Add</Button>
          </div>
        )}
      </Formik>
    </div>
  );
};

interface Ingredient {
  name: string;
  quantity: string;
}

interface Recipe {
  name: string;
  description: string;
  ingredients: Array<Ingredient>;
  instruction: string;
}

export function RecipeForm({ addRecipe }: RecipeFormProps) {
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

    postRecipe(data).then((response: any) => {
      console.log(response);
      const recipe = { ...data, id: response };
      console.log(recipe)
      addRecipe(recipe);
    })

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginTop: 100, marginBottom: 10 }}>
        <label>Name</label>
        <input
          {...register("name", { required: "Please enter recipe name." })} // custom message
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Description</label>
        <TextField style={{
          marginLeft: 50,
          width: 700,
          borderRadius: 35,
          backgroundColor: "#FFFFFF"
        }}
          multiline
          rows={2}
          maxRows={Infinity}
          {...register("description")} // custom message
        />
      </div>
      {/* <IngredientInput /> */}
      <div style={{ marginBottom: 10 }}>
        <label>Instruction</label>
        <TextField style={{
          marginLeft: 50,
          width: 700,
          borderRadius: 35,
          backgroundColor: "#FFFFFF"
        }}
          multiline
          rows={2}
          maxRows={Infinity}
          {...register("instruction")} // custom message
        />

      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Cooktime</label>
        <input
          {...register("cooktime")} // custom message
        />
      </div>
      <input type="submit" />
    </form>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     padding: 40,
//   },
//   title: {
//     color: colors.primary,
//     fontSize: 24,
//     textTransform: "capitalize",
//     marginBottom: 16,
//   },
//   label: {
//     textTransform: "capitalize",
//   },
// });
