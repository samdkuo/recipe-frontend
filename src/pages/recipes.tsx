import React, { useCallback, useState } from "react";
import { useModalState, useWindowDimensionsQuery } from "../hooks";
import { RecipeCard } from "../RecipeCard";
import { RecipeForm } from "../RecipeForm";
import { fetchRecipeEntries } from "../requests/recipe";
import { Grid, Input } from "semantic-ui-react";
import { Modal, Button } from "@mui/material"

interface Recipe {
  id: number;
  name: string;
  description: string;
  totalIngredients: number;
  instruction: string;
  cooktime: number;
  image: string;
}

const Home = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  React.useEffect(() => {
    fetchRecipeEntries().then((response: Recipe[]) => {
      if (response) {
        setRecipes(response);
      }
    });
  }, []);

  const { small, medium } = useWindowDimensionsQuery();
  const { visible, onClose, onOpen } = useModalState();

  const addRecipe = useCallback((recipe: Recipe) => {
    console.log("add recipe, ", recipe)
    setRecipes([...recipes, recipe])
  }, [recipes, setRecipes])

  return (
    <div>

      <Button style={{ width: 140, marginBottom: 16 }} variant="contained" onClick={onOpen}>
        Add Recipe +
      </Button>
      <Modal
        open={visible}
        onClose={onClose}
      >
        <RecipeForm addRecipe={addRecipe} />
      </Modal>
      <Grid
        numColumns={small ? 1 : medium ? 3 : 5}
        gap={16}
        style={{ justifyContent: "center" }}
      >
        {recipes.map(
          (
            {
              name,
              totalIngredients,
              cooktime,
              image,
              id,
              description,
              instruction,
            },
            index
          ) => (
            <RecipeCard
              key={index}
              id={id}
              title={name}
              totalIngredients={totalIngredients}
              cookTime={cooktime}
              image={image}
              description={description}
              instruction={instruction}
            />
          )
        )}
      </Grid>
    </div>
  );
};

export default Home;
