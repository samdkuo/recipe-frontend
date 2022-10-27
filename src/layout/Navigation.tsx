import { Button } from "@mui/material";
import React, { Suspense } from "react";
import { Link as ReactLink, useHistory } from "react-router-dom";

import { dimensions } from "./types";

let loginon = false;


const Navigation = ({ routes }: { routes: any }) => {
  const history = useHistory();


  const handleLogin = () => {
    let path = `Login`;
    history.push(path);
    loginon = true;
    console.log(window.location.href);
  };

  const handleCalendar = () => {
    let path = `menu`;
    history.push(path);
    console.log(window.location.href);
  };

  const handleLogout = () => {
    localStorage.setItem("jwt", "")
    let path = ``;
    loginon = false;
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
      {localStorage.getItem("jwt") || (loginon && window.location.href !== "http://localhost:8080/Login") ?
        <><Button
          style={{ width: 148, float: 'right', backgroundColor: 'white', color: "#67c4fc" }}
          variant="contained"
          onClick={handleLogout}
        >
          Signout
        </Button><Button
          style={{ width: 148, right: 10, float: 'right', backgroundColor: 'white', color: "#67c4fc" }}
          variant="contained"
          onClick={handleCalendar}
        >
            Calendar
          </Button></>
        : window.location.href !== "http://localhost:8080/Login" ? (
          <Button
            style={{ width: 148, float: 'right', backgroundColor: 'white', color: "#67c4fc" }}
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
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
