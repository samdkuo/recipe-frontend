import React, { useCallback, useState } from "react";
import { useModalState, useWindowDimensionsQuery } from "../hooks";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeForm } from "../components/RecipeForm";
import {
  fetchRecipeEntries,
  fetchRecipeFromIngredient,
  SearchRecipeEntries,
} from "../requests/recipe";
import { Grid, Item } from "semantic-ui-react";
import {
  Modal,
  Box,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { Search } from "@mui/icons-material";

import { Button } from "../components";

interface Recipe {
  filter(recipe: Recipe): React.SetStateAction<Recipe[]>;
  id: number;
  name: string;
  description: string;
  totalIngredients: Ingredient[];
  instruction: string;
  cooktime: number;
  image: string;
}

interface Ingredient {
  name: string;
  quantity: number;
  description: string;
  units: string;
}
const Home = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [value, setValue] = useState("");

  React.useEffect(() => {
    fetchRecipeEntries().then((response: Recipe[]) => {
      if (response) {
        console.log(response);
        const text = response[2].description;
        const newText = text.split("\n").map((str) => <p>{str}</p>);
        console.log(newText);
        setRecipes(response);
      }
    });
  }, []);

  const { small, medium } = useWindowDimensionsQuery();
  const { visible, onClose, onOpen } = useModalState();

  const addRecipe = useCallback(
    (recipe: Recipe) => {
      console.log("add recipe, ", recipe);
      const clear = recipes.filter((item) => item.id <= 0);
      setRecipes(clear);
      setRecipes([...recipes, recipe]);
    },
    [recipes, setRecipes]
  );

  const deleteRstate = useCallback(
    (recipe: number) => {
      console.log("delete recipe, ", recipe);
      const newlist = recipes.filter((item) => item.id !== recipe);
      console.log(newlist);
      const clear = recipes.filter((item) => item.id <= 0);
      console.log(clear);
      setRecipes(clear);
      setRecipes(newlist);
    },
    [recipes, setRecipes]
  );

  const updateRecipeState = useCallback(
    (entry: any, recipe: number) => {
      const newState = recipes.map((item) => {
        if (item.id === recipe) {
          return {
            ...item,
            name: entry.name,
            description: entry.description,
            instruction: entry.instruction,
            cooktime: entry.cooktime,
          };
        }
        return item;
      });
      const clear = recipes.filter((item) => item.id <= 0);
      setRecipes(clear);
      console.log(newState);
      setRecipes(newState);
    },
    [recipes, setRecipes]
  );

  const [searchData, setSearchData] = useState(recipes);

  const [searchtype, setsearchtype] = React.useState("byname");
  const choosesearch = (event: SelectChangeEvent) => {
    setsearchtype(event.target.value as string);
  };
  const searchItem = (query: any) => {
    if (query !== "") {
      SearchRecipeEntries(query).then((response: Recipe[]) => {
        if (response) {
          const clear = recipes.filter((item) => item.id <= 0);
          setRecipes(clear);
          console.log(response);
          setRecipes(response);
        }
      });
    } else {
      fetchRecipeEntries().then((response: Recipe[]) => {
        if (response) {
          console.log(response);
          const text = response[2].description;
          const newText = text.split("\n").map((str) => <p>{str}</p>);
          console.log(newText);
          const clear = recipes.filter((item) => item.id <= 0);
          setRecipes(clear);
          setRecipes(response);
        }
      });
    }
  };
  const searchIteming = (query: any) => {
    if (query !== "") {
      fetchRecipeFromIngredient(query).then((response: Recipe[]) => {
        if (response) {
          const clear = recipes.filter((item) => item.id <= 0);
          setRecipes(clear);
          console.log(response);
          setRecipes(response);
        }
      });
    } else {
      fetchRecipeEntries().then((response: Recipe[]) => {
        if (response) {
          console.log(response);
          const text = response[2].description;
          const newText = text.split("\n").map((str) => <p>{str}</p>);
          console.log(newText);
          const clear = recipes.filter((item) => item.id <= 0);
          setRecipes(clear);
          setRecipes(response);
        }
      });
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <Button
        style={{ alignSelf: "flex-end", width: 148, marginBottom: 16 }}
        variant="contained"
        onClick={onOpen}
      >
        Add Recipe +
      </Button>
      <Modal open={visible} onClose={onClose}>
        <Box
          className="modalBox"
          sx={{
            position: "absolute",
            overflowY: "scroll",
            width: "80%",
            height: "80%",
            margin: "auto",
            // marginLeft: "10%",
            // marginTop: -13,
          }}
        > */}
      <RecipeForm
        addRecipe={addRecipe}
        updateRecipeState={updateRecipeState}
        update={false}
        rid={0}
        name={""}
        description={""}
        instruction={""}
        cooktime={""}
      />
      {/* </Box>
      </Modal> */}

      <div style={{ display: "flex", flexDirection: "row" }}>
        <TextField
          fullWidth
          placeholder={"Search recipes by..."}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            searchItem(e.target.value);
          }}
          InputProps={{
            type: "search",
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchtype}
          onChange={choosesearch}
          style={{ marginLeft: 4, width: 180 }}
        >
          <MenuItem value={"byname"}>name</MenuItem>
          <MenuItem value={"bying"}>ingredients</MenuItem>
        </Select>
      </div>

      <div className="item-container">
        {searchData.map((item) => (
          <Item {...item} key={item.name} />
        ))}
      </div>

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
              deleteRstate={deleteRstate}
              updateRecipeState={updateRecipeState}
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
