import axios from "axios";
import { identity } from "lodash-es";
import { accountTypes } from "../constants/actionTypes";
const serverURL = "http://localhost:3000/api/v1";;

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
  const jwttext = "" + localStorage.getItem("jwt")
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
        label: entry.label,
      },
      { headers: { "jwt-token": jwttext} }
    )
    .then((response) => {
      console.log("successful post");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

// use in login to validate
// check everytime user clicks around the website?
// check after the time limit is up? 
export const verifyAccountInfo = (accountId: number, jwtToken: string) => {
  const api = serverURL;
  const url = `${api}/account/accountID/${accountId}`;
  console.log(url);
    return axios
    .get(url , {headers:{ "Jwt-Token": jwtToken}})
    .then(response => {
      console.log("sucessful get: jwt", accountId, jwtToken);
      setAccountInfo(accountId, jwtToken);
      return true;
    })
    .catch(function(error) {
      console.log("error in get account info:", error);
      //dispatch(signout()) 
      return false; 
    });
}

export const setAccountInfo = async (id: number, jwt: string) => {
  await localStorage.setItem("jwt", jwt);
  localStorage["id"] = id;
  console.log("account info set")
  return { type: accountTypes.VERIFIED, id: id, jwt: jwt, verified: true};
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
        unit: entry.unit,
        adjective: entry.adjective,
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
  const jwttext = "" + localStorage.getItem("jwt")
  return axios
    .delete(`${recipe}/${recipeId}`, { headers: { "Jwt-Token": jwttext } })
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
  const jwttext = "" + localStorage.getItem("jwt")
  return axios
    .delete(`${recipe}/${recipeId}`, { headers: { "Jwt-Token": jwttext } })
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
      label: entry.label,
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

export const searchLabels = (lid:string) => {
  const api = serverURL;
  const recipe = `${api}/label/${lid}/recipe`;
  return axios
  .get(`${recipe}`, { headers: { "Jwt-Token": "" } })
  .then((response) => {
    console.log("successful recipe name search");
    return response.data;
  })
  .catch((error) => {
    console.log("error: ", error);
  });
};

export const Login = (email:string, password:string) => {
  console.log(email + " " + password);
  const api = serverURL;
  const recipe = `${api}/login`;
  return axios
    .post(
      `${recipe}`,
      {
        email: email,
        password: password,
      },
      { headers: { "Jwt-Token": "" } }
    )
    .then((response) => {
      console.log("sucessful post: login");
      const accountId = response.data[0].id;
      const jwtToken = response.headers["jwt-token"];
      console.log(accountId + " " + jwtToken); 
      verifyAccountInfo(accountId, jwtToken)
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const posttoplanner = (rid:number, rnum:number) => {
  console.log(rid + " " + rnum);
  const api = serverURL;
  const recipe = `${api}/recipe_image`;
  const jwttext = "" + localStorage.getItem("jwt")
  return axios
    .post(
      `${recipe}`,
      {
        day_id: 1,
        recipe_id: rnum
      },
      { headers: { "Jwt-Token":jwttext } }
    )
    .then((response) => {
      console.log("successful recipe_image post");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const postshoppinglist = (name:string) => {
  console.log(localStorage["id"]  + " " + name);
  const api = serverURL;
  const recipe = `${api}/shopping_list`;
  const jwttext = "" + localStorage.getItem("jwt")
  return axios
    .post(
      `${recipe}`,
      {
        name:name
      },
      { headers: { "Jwt-Token": jwttext } }
    )
    .then((response) => {
      console.log("successful shopping_list post");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const postshoppinglisting = (entry: any) => {
  console.log(entry);
  const api = serverURL;
  const recipe = `${api}/shopping_list`;
  const jwttext = "" + localStorage.getItem("jwt")
  return axios
    .post(
      `${recipe}`,
      {
        name: entry.name,
        unit: entry.unit,
        adjective: entry.adjective,
        quantity: entry.quantity,
      },
      { headers: { "Jwt-Token": jwttext } }
    )
    .then((response) => {
      console.log("successful shopping_list post");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};
export const postshoppingrecipe = (shid:number, rid:number) => {
  console.log(shid + " " + rid);
  const api = serverURL;
  const recipe = `${api}/shopping_list_recipe`;
  const jwttext = "" + localStorage.getItem("jwt")
  return axios
    .post(
      `${recipe}`,
      {
        shopping_list_id:shid,
        recipe_id:rid
      },
      { headers: { "Jwt-Token": jwttext } }
    )
    .then((response) => {
      console.log("successful postshoppingrecipe post");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const fetchShoppinglist = () => {
  const api = serverURL;
  const recipe = `${api}/shopping_list`;
  return axios
    .get(`${recipe}`, { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful shopping_list search");
      console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const fetchShoppinglistingredients = (shid: number) => {
  const api = serverURL;
  const recipe = `${api}/shopping_list_ingredient_all/${shid}`;
  return axios
    .get(`${recipe}`, { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful shopping_list search");
      console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const deleteShoppinglist = (shid: number) => {
  console.log(shid);
  const api = serverURL;
  const recipe = `${api}/shopping_list`;
  const jwttext = "" + localStorage.getItem("jwt")
  return axios
    .delete(`${recipe}/${shid}`, { headers: { "Jwt-Token": jwttext } })
    .then((response) => {
      console.log("successful delete");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const updateShoppinglist = (name:string,shid:number) => {
  console.log(localStorage["id"]  + " " + name);
  const api = serverURL;
  const recipe = `${api}/shopping_list`;
  const jwttext = "" + localStorage.getItem("jwt")
  return axios
    .put(
      `${recipe}/${shid}`,
      {
        id:shid,
        name:name
      },
      { headers: { "Jwt-Token": jwttext } }
    )
    .then((response) => {
      console.log("successful shopping_list post");
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const fetchShoppinglistrecipe = (shid: number) => {
  const api = serverURL;
  const recipe = `${api}/shopping_list_recipe/${shid}`;
  return axios
    .get(`${recipe}`, { headers: { "Jwt-Token": "" } })
    .then((response) => {
      console.log("successful shopping_list search");
      console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};