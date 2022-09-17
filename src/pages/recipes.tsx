import React, { useCallback } from "react";
import { useModalState, useWindowDimensionsQuery } from "../hooks";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeForm } from "../components/RecipeForm";
import {
  fetchRecipeEntries,
  fetchRecipeFromIngredient,
  fetchrecipeimage,
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
  Dialog,
} from "@mui/material";
import configData from "../config.json";

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

interface Image {
  recipe_id: number;
  image_url: string;
}

const Home = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [value, setValue] = React.useState("");
  const [searchData, setSearchData] = React.useState(recipes);
  const [searchtype, setsearchtype] = React.useState("byname");
  const { small, medium } = useWindowDimensionsQuery();
  const { visible, onClose, onOpen } = useModalState();

  React.useEffect(() => {
    fetchrecipeimage().then((images: Image[]) => {
      if (images) {
        console.log(images);
        fetchRecipeEntries().then((response: Recipe[]) => {
          if (response) {
            for (let i = 0; i < response.length; i++) {
              response[i].image = configData.default_image;
              for (let j = 0; j < images.length; j++) {
                if (response[i].id == images[j].recipe_id) {
                  response[i].image = images[j].image_url;
                }
              }
            }
            console.log(response);
            setRecipes(response);
          }
        });
      }
    });
  }, []);


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
      fetchrecipeimage().then((images: Image[]) => {
        if (images) {
          console.log(images);
          fetchRecipeEntries().then((response: Recipe[]) => {
            if (response) {
              for (let i = 0; i < response.length; i++) {
                response[i].image = configData.default_image;
                for (let j = 0; j < images.length; j++) {
                  if (response[i].id == images[j].recipe_id) {
                    response[i].image = images[j].image_url;
                  }
                }
              }
              const clear = recipes.filter((item) => item.id <= 0);
              setRecipes(clear);
              console.log(response);
              setRecipes(response);
            }
          });
        }
      });
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
            image: entry.image
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

  const updateRecipeImage = useCallback(
    (recipe: number, imagepath: string) => {
      console.log(recipes);
      const newState = recipes.map((item) => {
        if (item.id === recipe) {
          return {
            ...item,
            image: imagepath,
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

  const choosesearch = (event: SelectChangeEvent) => {
    setsearchtype(event.target.value as string);
  };
  const searchItem = (query: any) => {
    if (query !== "") {
      fetchrecipeimage().then((images: Image[]) => {
        if (images) {
          console.log(images);
          SearchRecipeEntries(query).then((response: Recipe[]) => {
            if (response) {
              for (let i = 0; i < response.length; i++) {
                response[i].image = configData.default_image;
                for (let j = 0; j < images.length; j++) {
                  if (response[i].id == images[j].recipe_id) {
                    response[i].image = images[j].image_url;
                  }
                }
              }
              const clear = recipes.filter((item) => item.id <= 0);
              setRecipes(clear);
              console.log(response);
              setRecipes(response);
            }
          });
        }
      });
    } else {
      fetchrecipeimage().then((images: Image[]) => {
        if (images) {
          console.log(images);
          fetchRecipeEntries().then((response: Recipe[]) => {
            if (response) {
              for (let i = 0; i < response.length; i++) {
                response[i].image = configData.default_image;
                for (let j = 0; j < images.length; j++) {
                  if (response[i].id == images[j].recipe_id) {
                    response[i].image = images[j].image_url;
                  }
                }
              }
              const clear = recipes.filter((item) => item.id <= 0);
              setRecipes(clear);
              console.log(response);
              setRecipes(response);
            }
          });
        }
      });
    }
  };
  const searchIngredient = (query: any) => {
    if (query !== "") {
      fetchrecipeimage().then((images: Image[]) => {
        if (images) {
          console.log(images);
          fetchRecipeFromIngredient(query).then((response: Recipe[]) => {
            if (response) {
              for (let i = 0; i < response.length; i++) {
                response[i].image = configData.default_image;
                for (let j = 0; j < images.length; j++) {
                  if (response[i].id == images[j].recipe_id) {
                    response[i].image = images[j].image_url;
                  }
                }
              }
              const clear = recipes.filter((item) => item.id <= 0);
              setRecipes(clear);
              console.log(response);
              setRecipes(response);
            }
          });
        }
      });
    } else {
      fetchrecipeimage().then((images: Image[]) => {
        if (images) {
          console.log(images);
          fetchRecipeEntries().then((response: Recipe[]) => {
            if (response) {
              for (let i = 0; i < response.length; i++) {
                response[i].image = configData.default_image;
                for (let j = 0; j < images.length; j++) {
                  if (response[i].id == images[j].recipe_id) {
                    response[i].image = images[j].image_url;
                  }
                }
              }
              const clear = recipes.filter((item) => item.id <= 0);
              setRecipes(clear);
              console.log(response);
              setRecipes(response);
            }
          });
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
      <Button
        style={{ width: 148, marginBottom: 16 }}
        variant="contained"
        onClick={onOpen}
      >
        Add Recipe +
      </Button>
      <Dialog maxWidth="md" open={visible} onClose={onClose}>
        <RecipeForm
          addRecipe={addRecipe}
          updateRecipeState={updateRecipeState}
          updateRecipeImage={updateRecipeImage}
          onClose={onClose}
          update={false}
          rid={0}
          image={"/images/icons8-sunny-side-up-eggs-96.png"}
          name={""}
          description={""}
          instruction={""}
          cooktime={""}
          buttonHandler={onClose} updateIngState={function (data: any): void {
            throw new Error("Function not implemented.");
          }} />
      </Dialog>
      {/* </Box>
      </Modal> */}

      <div style={{ display: "flex", flexDirection: "row" }}>
        {searchtype == "byname" ? (
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
        ) : (
          <TextField
            fullWidth
            placeholder={"Search recipes by..."}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              searchIngredient(e.target.value);
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
        )}

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
        numColumns={small ? 1 : medium ? 4 : 6}
        gap={16}
        style={{ justifyContent: "center", marginTop: 16 }}
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
              updateRecipeImage={updateRecipeImage}
              key={index}
              id={id}
              title={name}
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
