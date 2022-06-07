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
      },
      { headers: { "Jwt-Token": "" } }
    )
    .then((response) => {
      console.log("successful post");
      console.log(response.data);
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

export const updateRecipe = (entry: any, recipeId: number) => {
  const api = serverURL;
  const recipe = `${api}/recipe`;
  return axios
    .put(`${recipe}/${recipeId}`, {
      name: "Updatetest",
      description: "updatedes",
      instruction: entry.instruction,
      cooktime: "10",
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

export const getmaxId = (entry_id: number | null = null) => {
  const api = serverURL;
  const recipe = `${api}/recipe/max/id`;
  return axios
    .get(getRecipeURL(), { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful get id");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
  };