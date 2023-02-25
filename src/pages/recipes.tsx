import React, { useCallback } from "react";
import { useModalState, useWindowDimensionsQuery } from "../hooks";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeForm } from "../components/RecipeForm";
import {
  fetchRecipeEntries,
  fetchRecipeFromIngredient,
  fetchrecipeimage,
  searchLabels,
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
  DialogTitle,
} from "@mui/material";
import configData from "../config.json";
import { labels } from "../components/RecipeForm/types";
import { Search } from "@mui/icons-material";

import { Button } from "../components";
import { useHistory } from "react-router-dom";

interface Recipe {
  filter(recipe: Recipe): React.SetStateAction<Recipe[]>;
  id: number;
  name: string;
  description: string;
  totalIngredients: Ingredient[];
  instruction: string;
  cooktime: number;
  image: string;
  label: label;
}

interface Ingredient {
  name: string;
  quantity: number;
  description: string;
  units: string;
}

interface label {
  id: number;
  name: string;
}


interface Image {
  recipe_id: number;
  image_url: string;
}

const Home = (props: { location: { state: any; }; }) => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [value, setValue] = React.useState("");
  const [searchData, setSearchData] = React.useState(recipes);
  const [searchtype, setsearchtype] = React.useState(props.location.state || "byname");
  const { small, medium } = useWindowDimensionsQuery();
  const { visible, onClose, onOpen } = useModalState();
  const [labelval, setLabel] = React.useState(props.location.state.labelval || "0");

  React.useEffect(() => {
    fetchrecipeimage().then((images: Image[]) => {
      if (images) {
        console.log(images);
        if ((labelval != "" && labelval != "0")) {
          console.log(labelval);
          searchLabels(labelval).then((response: Recipe[]) => {
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
          setLabel(labelval);
          setsearchtype("bylabel");
        } else {
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
            label: entry.label,
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
    setValue("");
    searchItem("");
  };
  const searchItem = (query: any) => {
    if (query !== "" && query.length > 2) {
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
    } else if (query == "") {
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
    if (query !== "" && query.length > 2) {
      console.log(query);
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
    } else if (query == "") {
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

  const searchLabel = (selectlabel: string) => {
    if (selectlabel !== "") {
      console.log("selected label is " + selectlabel);
      fetchrecipeimage().then((images: Image[]) => {
        if (images) {
          console.log(images);
          searchLabels(selectlabel).then((response: Recipe[]) => {
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

  let searchbar;
  if (searchtype == "byname") {
    searchbar = <TextField
      fullWidth
      placeholder={"Search recipes by..."}
      value={value}
      onChange={(e) => {
        setLabel("");
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
  } else if (searchtype == "bying") {
    searchbar = <TextField
      fullWidth
      placeholder={"Search recipes by..."}
      value={value}
      onChange={(e) => {
        setLabel("");
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
  } else {
    searchbar = <TextField
      name="label"
      id="label"
      label="Label"
      value={labelval}
      onChange={(e) => {
        setLabel(e.target.value);
        searchLabel(e.target.value);
      }
      }
      select
      fullWidth
    >
      {labels.map((label, index) => (
        <MenuItem key={index} value={label.value}>
          {label.name}
        </MenuItem>
      ))}
    </TextField>
  }

  const history = useHistory();
  const handleLogin = () => {
    let path = `Login`;
    history.push(path);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {localStorage.getItem("jwt") ?
        <Button
          style={{ width: 148, marginBottom: 5 }}
          variant="contained"
          onClick={onOpen}
        >
          Add Recipe +
        </Button>
        : ""
      }
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
          labelid={0}
          buttonHandler={onClose} updateIngState={function (data: any): void {
            throw new Error("Function not implemented.");
          }} />
      </Dialog>
      {/* </Box>
      </Modal> */}

      <div style={{ display: "flex", flexDirection: "row" }}>
        {searchbar}

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchtype}
          onChange={choosesearch}
          style={{ marginLeft: 4, width: 180 }}
        >
          <MenuItem value={"byname"}>Name</MenuItem>
          <MenuItem value={"bying"}>Ingredients</MenuItem>
          <MenuItem value={"bylabel"}>Label</MenuItem>
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
              cooktime,
              image,
              id,
              description,
              instruction,
              label,
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
              labelname={label.name}
              labelid={label.id}
              description={description}
              instruction={instruction}
              isrecipelist={false}
            />
          )
        )}
      </Grid>
    </div>
  );
};

export default Home;
