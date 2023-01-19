import { Button } from "@mui/material";
import React, { Suspense } from "react";
import { Link as ReactLink, useHistory } from "react-router-dom";
import { dimensions } from "./types";



const Navigation = ({ routes }: { routes: any }) => {
  const history = useHistory();


  const handleLogin = () => {
    let path = `Login`;
    history.push(path);
    console.log(window.location.href);
  };

  const handleCalendar = () => {
    let path = `menu`;
    history.push(path);
    console.log(window.location.href);
  };
  const handleRecipes = () => {
    let path = `recipes`;
    history.push(path);
    console.log(window.location.href);
  };
  const handleLogout = () => {
    localStorage.setItem("jwt", "")
    let path = ``;
    history.push(path);
    console.log(window.location.href);
  };

  return (
    <div
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: dimensions.headerHeight,
        padding: 8,
        paddingBottom: 16,
      }}
    >
      <ReactLink to="/">
        <img src="images/fried-egg.png" style={{ width: 40, height: 40 }} />
      </ReactLink>
      {localStorage.getItem("jwt") ? //new login doesn't catch the jwt unless you hard code it at login.tsx
        <><Button
          style={{ width: 148, float: 'right', backgroundColor: 'white', color: "#67c4fc" }}
          variant="contained"
          onClick={handleLogout}
        >
          <span style={{ fontWeight: 'bold' }}>Signout</span>
        </Button><Button
          style={{ width: 148, right: 10, float: 'right', backgroundColor: 'white', color: "#67c4fc" }}
          variant="contained"
          onClick={handleRecipes}
        >
            <span style={{ fontWeight: 'bold' }}>Recipes</span>

          </Button><Button
            style={{ width: 148, right: 20, float: 'right', backgroundColor: 'white', color: "#67c4fc" }}
            variant="contained"
            onClick={handleCalendar}
          >
            <span style={{ fontWeight: 'bold' }}>Shopping Lists</span>
          </Button></>
        : window.location.href !== "http://localhost:8080/Login" ? (
          <div>
            <Button
              style={{ width: 148, float: 'right', backgroundColor: 'white', color: "#67c4fc" }}
              variant="contained"
              onClick={handleLogin}
            >
              <span style={{ fontWeight: 'bold' }}>Login</span>

            </Button><Button
              style={{ width: 148, right: 10, float: 'right', backgroundColor: 'white', color: "#67c4fc" }}
              variant="contained"
              onClick={handleRecipes}
            >
              <span style={{ fontWeight: 'bold' }}>Recipes</span>

            </Button>
          </div>
        ) : null
      }

      <div
        style={{
          flex: 0.5,
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: 16,
        }}
      >
        {routes.map((route: any, index: number) => {
          if (route.path !== "/") {
            const nav =
              route.path.substring(1, 2).toUpperCase() +
              route.path.substring(2).toLowerCase();
            return (
              <ReactLink key={index} to={nav} style={{ marginLeft: 16 }} />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Navigation;
