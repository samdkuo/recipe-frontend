import React, { Suspense } from "react";
import { Link as ReactLink } from "react-router-dom";

import { dimensions } from "./types";

const Navigation = ({ routes }: { routes: any }) => {
  return (
    <div
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: dimensions.headerHeight,
        paddingTop: 8,
        paddingBottom: 16,
      }}
    >
      <ReactLink to="/">
        <img
          src="images/fried-egg.png"
          style={{ width: 40, height: 40 }}
        />
      </ReactLink>
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
            return <ReactLink key={index} to={nav} style={{ marginLeft: 16 }} />;
          }
        })}
      </div>
    </div>
  );
};

export default Navigation;
