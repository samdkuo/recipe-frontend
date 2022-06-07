import React from "react";
import { useWindowDimensionsQuery } from "../hooks";
import { Chip, TextField, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = useHistory();
  const handleClick = () => {
    let path = `Recipes`;
    history.push(path);
  };

  const { small } = useWindowDimensionsQuery();
  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={"images/logo-long.png"}
        style={{ width: small ? 300 : 600, height: small ? 150 : 300 }}
      />
      <TextField
        placeholder="Search..."
        style={{ width: "100%", marginBottom: 20 }}
      />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {[
          "All",
          "Breakfast",
          "Entrees",
          "Bread",
          "Side Dishes",
          "Dessert",
          "Drinks",
        ].map((category, index) => (
          <Grid item>
            <Chip style={{ minWidth: 115 }} label={category} onClick={handleClick} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
