import React, { useState } from "react";
import { useWindowDimensionsQuery } from "../hooks";
import { Chip, TextField, Grid, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const Home = () => {
  let labels = [
    { name: "All", value: "0", index: 0 },
    { name: "Breakfast", value: "1", index: 1 },
    { name: "Lunch", value: "2", index: 2 },
    { name: "Dinner", value: "3", index: 3 },
  ]

  const history = useHistory();
  const handleClick = (index: number) => {
    console.log(labels[index]);
    console.log("\"" + labels[index].value + "\"");
    let path = {
      pathname: 'Recipes',

      state: {
        searchtype: "bylabel",
        labelval: labels[index].value
      }
    };
    handleLogin(path);
  };

  const handlesearch = (name: string) => {
    let path = `Recipes`;
    history.push(path);
  }

  const handleLogin = (path: any) => {
    history.push(path);
  };

  const [value, setValue] = useState("");

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
        placeholder="Search by Ingredient..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            console.log(value);
            handlesearch(value);
          }
        }}
        style={{ width: "100%", marginBottom: 20 }}
      />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {labels.map((labels, index) => (
          <Grid item>
            <Chip style={{ minWidth: 115 }} label={labels.name} onClick={() => {
              handleClick(labels.index);
            }} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
