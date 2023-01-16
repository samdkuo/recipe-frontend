import { Button, TextField } from "@mui/material";
import { width } from "@mui/system";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Login } from "../requests/recipe";


const Home = () => {
  const history = useHistory();
  const handleClick = () => {
    let path = ``;
    history.push(path);
    localStorage.setItem("jwt", "a") //i can't for the life of me make a global variable so this will have to do
    Login(email, password);
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleemailChange =
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    }

  const handleKeyDown = (ev: { key: string; }) => {
    if (ev.key === 'Enter') {
      handleClick();
    }
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
        type="password" name="password"
        id="password"
        variant="outlined"
        label="Password"
        onChange={handlepasswordChange}
        onKeyDown={handleKeyDown}
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