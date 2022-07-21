import React, { useCallback, useState } from "react";
import { useModalState, useWindowDimensionsQuery } from "../hooks";
import { RecipeCard } from "../RecipeCard";
import { RecipeForm } from "../RecipeForm";
import { fetchRecipeEntries, fetchRecipeFromIngredient, SearchRecipeEntries } from "../requests/recipe";
import { Grid, Input, Item } from "semantic-ui-react";
import { Modal, Button, Box, TextField, Select, MenuItem, SelectChangeEvent } from "@mui/material"
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
        const newText = text.split('\n').map(str => <p>{str}</p>);
        console.log(newText);
        setRecipes(response);
      }
    });
  }, []);


  const { small, medium } = useWindowDimensionsQuery();
  const { visible, onClose, onOpen } = useModalState();

  const addRecipe = useCallback((recipe: Recipe) => {
    console.log("add recipe, ", recipe)
    const clear = recipes.filter((item) => item.id <= 0)
    setRecipes(clear);
    setRecipes([...recipes, recipe])
  }, [recipes, setRecipes])

  const deleteRstate = useCallback((recipe: number) => {
    console.log("delete recipe, ", recipe)
    const newlist = recipes.filter((item) => item.id !== recipe)
    console.log(newlist);
    const clear = recipes.filter((item) => item.id <= 0)
    console.log(clear);
    setRecipes(clear);
    setRecipes(newlist);
  }, [recipes, setRecipes])

  const updateRstate = useCallback((entry: any, recipe: number) => {
    const newState = recipes.map(item => {
      if (item.id === recipe) {
        return { ...item, name: entry.name, description: entry.description, instruction: entry.instruction, cooktime: entry.cooktime };
      }
      return item;
    });
    const clear = recipes.filter((item) => item.id <= 0)
    setRecipes(clear);
    console.log(newState);
    setRecipes(newState);
  }, [recipes, setRecipes])

  const [searchData, setSearchData] = useState(recipes);

  const [searchtype, setsearchtype] = React.useState('byname');
  const choosesearch = (event: SelectChangeEvent) => {
    setsearchtype(event.target.value as string);
  };
  const searchItem = (query: any) => {
    if (query !== "") {
      SearchRecipeEntries(query).then((response: Recipe[]) => {
        if (response) {
          const clear = recipes.filter((item) => item.id <= 0)
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
          const newText = text.split('\n').map(str => <p>{str}</p>);
          console.log(newText);
          const clear = recipes.filter((item) => item.id <= 0)
          setRecipes(clear);
          setRecipes(response);
        }
      });
    }
  }
  const searchIteming = (query: any) => {
    if (query !== "") {
      fetchRecipeFromIngredient(query).then((response: Recipe[]) => {
        if (response) {
          const clear = recipes.filter((item) => item.id <= 0)
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
          const newText = text.split('\n').map(str => <p>{str}</p>);
          console.log(newText);
          const clear = recipes.filter((item) => item.id <= 0)
          setRecipes(clear);
          setRecipes(response);
        }
      });
    }
  }
  return (
    <div>
      <Button style={{ width: 140, marginBottom: 16 }} variant="contained" onClick={onOpen}>
        Add Recipe +
      </Button>
      <Modal
        open={visible}
        onClose={onClose}
      >
        <Box className="modalBox" sx={{ position: "absolute", overflowY: "scroll", maxHeight: "115%", marginLeft: "10%", width: "80%", marginTop: -13 }}>
          <RecipeForm addRecipe={addRecipe} updateRstate={updateRstate} update={false} rid={0} name={""}
            description={""} instruction={""} cooktime={""} />
        </Box>
      </Modal>
      <Select

        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={searchtype}
        label="Age"
        onChange={choosesearch}
      >
        <MenuItem value={"byname"}>Search by name</MenuItem>
        <MenuItem value={"bying"}>Search by ingredient</MenuItem>
      </Select>
      {searchtype == "byname" ?
        <TextField
          placeholder="Search Recipe..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            searchItem(e.target.value);
          }}
          style={{ width: "100%", marginBottom: 20 }}
        />
        :
        <TextField
          placeholder="Search Recipe..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            searchIteming(e.target.value);
          }}
          style={{ width: "100%", marginBottom: 20 }}
        />
      }
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
              updateRstate={updateRstate}
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
