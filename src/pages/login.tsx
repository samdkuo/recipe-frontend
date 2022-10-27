import { Button, TextField } from "@mui/material";
import { width } from "@mui/system";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Login } from "../requests/recipe";
import loginon from "../layout/Navigation";


const Home = () => {
  const history = useHistory();
  const handleClick = () => {
    let path = ``;
    history.push(path);
    Login(email, password);
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleemailChange =
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    }


  const handlepasswordChange =
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    }

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
        src={"images/profile-icon-login-head-icon-vector.jpeg"}
        style={{ width: 100, height: 100, marginBottom: 40 }}
      />
      <TextField
        name="email"
        id="email"
        variant="outlined"
        label="Email"
        onChange={handleemailChange}
        style={{ width: "30%", marginBottom: "1%" }}
      />
      <TextField
        name="password"
        id="password"
        variant="outlined"
        label="Password"
        onChange={handlepasswordChange}
        style={{ width: "30%", marginBottom: "1%" }}
      />
      <Button
        style={{ width: 148 }}
        variant="contained"
        onClick={handleClick}
      >
        Submit
      </Button>
    </div>
  );
}
export default Home;