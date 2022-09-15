import axios from "axios";
const serverURL = "http://localhost:3000/api/v1";

export const getRecipeURL = (entry_id = null) => {
  const api = serverURL;
  const recipe = `${api}/recipe`;

  if (entry_id === null) {
    return recipe;
  } else {
    return `${recipe}/recipeID/${entry_id}`;
  }
};
export const getIngredientsURL = (entry_id: number | null = null) => {
  const api = serverURL;
  const ingredient = `${api}/ingredient`;
  const recipeing = `${ingredient}/list-ingredients`;

  if (entry_id === null) {
    return recipeing;
  } else {
    return `${recipeing}/recipeID/${entry_id}`;
  }
};
export const getRecipeURL2 = (entry_id: number | null = null) => {
  const api = serverURL;
  const recipe = `${api}/recipe`;

  if (entry_id === null) {
    return recipe;
  } else {
    return `${recipe}/recipeID/${entry_id}`;
  }
};
export const fetchRecipeEntries = () => {
  return axios
    .get(getRecipeURL(), { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful get");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const fetchRecipeIngredients = (recipeId: number) => {
  return axios
    .get(getIngredientsURL(recipeId), { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful get");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const fetchRecipeDAI = (recipeId: number) => {
  return axios
    .get(getRecipeURL2(recipeId), { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful get");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const postRecipe = (entry: any) => {
  console.log(entry);
  const api = serverURL;
  const recipe = `${api}/recipe`;
  return axios
    .post(
      `${recipe}`,
      {
        name: entry.name,
        description: entry.description,
        instruction: entry.instruction,
        cooktime: entry.cooktime,
        Label: entry.Label,
      },
      { headers: { "Jwt-Token": "" } }
    )
    .then((response) => {
      console.log("successful post");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const postIngredient = (entry: any, rid:number) => {
  console.log(entry);
  const api = serverURL;
  const recipe = `${api}/ingredient/recipeID/${rid}`;
  return axios
    .post(
      `${recipe}`,
      {
        name: entry.name,
        unit: entry.units,
        description: entry.description,
        quantity: entry.quantity,
      },
      { headers: { "Jwt-Token": "" } }
    )
    .then((response) => {
      console.log("successful ingredient post");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const deleteRecipe = (recipeId: number) => {
  const api = serverURL;
  const recipe = `${api}/recipe`;

  return axios
    .delete(`${recipe}/${recipeId}`, { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful delete");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const deleteRecipeImage = (recipeId: number) => {
  const api = serverURL;
  const recipe = `${api}/recipe_image`;

  return axios
    .delete(`${recipe}/${recipeId}`, { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful delete");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const deleteIngrediant = (recipeId: number, ingredientname: string) => {
  const api = serverURL;
  const recipe = `${api}/ingredient/recipeID/${recipeId}/ingredientID/${ingredientname}`;

  return axios
    .delete(`${recipe}`, { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful delete");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const updateRecipe = (entry: any, recipeId: number) => {
  const api = serverURL;
  const recipe = `${api}/recipe`;
  return axios
    .put(`${recipe}/${recipeId}`, {
      name: entry.name,
      description: entry.description,
      instruction: entry.instruction,
      cooktime: entry.cooktime,
    },
     { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful put");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const fetchRecipeFromIngredient = (IngName: string) => {
  const api = serverURL;
  const recipe = `${api}/ingredient/filterrecipe/ingredientID`;
  return axios
    .get(`${recipe}/${IngName}`, { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful recipe from ingredient search");
      console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};


export const SearchRecipeEntries = (Rname: string) => {
  const api = serverURL;
  const recipe = `${api}/recipe/search`;
  return axios
    .get(`${recipe}/${Rname}`, { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful recipe name search");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const postimage = (image: any) => {
  const api = serverURL;
  const recipe = `${api}/uploadfile/1`;
  return axios
  .post(
    `${recipe}`,
    {
      myFile: image
    },
    { headers: { "Jwt-Token": "",   "Content-Type": "multipart/form-data", } }
  )
    .then((response) => {
      console.log(image);
      console.log("successful image post");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const fetchrecipeimage = () => {
  const api = serverURL;
  const recipe = `${api}/recipe_image`;
  return axios
    .get(`${recipe}`, { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful recipe from ingredient search");
      console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const postRecipeimage = (rid:number, url:string) => {
  console.log(rid + " " + url);
  const api = serverURL;
  const recipe = `${api}/recipe_image`;
  return axios
    .post(
      `${recipe}`,
      {
        recipe_id: rid,
        image_url: url,
      },
      { headers: { "Jwt-Token": "" } }
    )
    .then((response) => {
      console.log("successful recipe_image post");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const updateRecipeimage = (rid:number, url:string) => {
  console.log(rid + " " + url);
  const api = serverURL;
  const recipe = `${api}/recipe_image/${rid}`;
  return axios
    .put(
      `${recipe}`,
      {
        image_url: url,
      },
      { headers: { "Jwt-Token": "" } }
    )
    .then((response) => {
      console.log("successful recipe_image post");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};
