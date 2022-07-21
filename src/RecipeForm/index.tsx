import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Formik } from "formik";
import { colors } from "../theme/colors";
import { postIngredient, postRecipe, updateRecipe } from "../requests/recipe";
import { Toolbar, TextField, Button, MenuItem, styled, MenuProps, Menu, alpha, Divider } from "@mui/material"
import './styles.css'
import axios from 'axios';

interface RecipeFormProps { addRecipe: (data: any) => void, updateRstate: (data: any, rid: number) => void, update: boolean, rid: number, name: any, description: any, instruction: any, cooktime: any }

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
          <div
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >

            <TextField
              style={{
                marginLeft: "10%",
                backgroundColor: "#FFFFFF",
                width: "10%"
              }}
              onChange={handleChange("quantity")}
              onBlur={handleBlur("quantity")}
              id="quantity"
              label="quantity"
              defaultValue=""
            />

            <TextField
              style={{
                backgroundColor: "#FFFFFF",
                width: "15%"
              }}
              onChange={handleChange("units")}
              onBlur={handleBlur("units")}
              id="units"
              label="units"
              defaultValue=""
            />

            <TextField
              style={{
                backgroundColor: "#FFFFFF",
                width: "15%"
              }}
              onChange={handleChange("description")}
              onBlur={handleBlur("description")}
              id="description"
              label="description"
              defaultValue=""
            />
            <TextField
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              id="name"
              label="name"
              defaultValue=""
              style={{
                backgroundColor: "#FFFFFF",
                width: "30%"
              }}
            />


            <Button style={{ width: "10%", height: "4%", marginTop: 10, position: 'absolute', backgroundColor: 'black', color: 'white' }} onClick={() => handlingSubmit(values)}>Add</Button>
          </div>
        )}
      </Formik>
    </div>
  );
};

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

export function RecipeForm({ addRecipe, updateRstate, name, update, rid, description, instruction, cooktime }: RecipeFormProps) {
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
        console.log(recipe)
        addRecipe(recipe);
      })
    } else {
      console.log(update)
      console.log(data)
      updateRstate(data, rid);
      updateRecipe(data, rid)
    }

  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginTop: 100, marginBottom: 10, }} >
        <label>Name</label>
        <input
          style={{
            marginLeft: '10%',
            width: '80%',
            borderColor: 'gray',
            borderRadius: 4
          }}
          defaultValue={name}
          {...register("name", { required: "Please enter recipe name." })} // custom message
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Description</label>
        <TextField style={{
          marginLeft: '10%',
          width: '80%',
          borderColor: 'gray',
          borderRadius: 4
        }}
          defaultValue={description}
          multiline
          rows={5}
          maxRows={Infinity}
          {...register("description")} // custom message
        />
      </div>
      {<IngredientInput rid={rid} addRecipe={function (data: any): void {
      }} updateRstate={function (data: any, rid: number): void {
      }} update={false} name={undefined} description={undefined} instruction={undefined} cooktime={undefined} />}
      <div style={{ marginBottom: 10 }}>
        <label>Instruction</label>
        <TextField style={{
          marginLeft: '10%',
          borderRadius: 4,
          borderColor: 'gray',
          width: '80%'
        }}
          defaultValue={instruction}
          multiline
          rows={5}
          maxRows={Infinity}
          {...register("instruction")} // custom message
        />
        <div>
          <label> Label </label>
          <select style={{
            marginLeft: '10%',
            borderRadius: 4,
            borderColor: 'gray',
            width: '80%'
          }} {...register("Label")}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Cooktime</label>
        <input
          style={{
            marginLeft: '10%',
            borderRadius: 4,
            borderColor: 'gray',
            width: '80%'
          }}
          defaultValue={cooktime}
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
