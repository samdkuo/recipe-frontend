import React from "react";
import { Navigation } from "./index";
import { dimensions } from "./types";

const Layout = ({ children, routes }: { children: any; routes: any }) => {
  return (
    <div
      style={{
        maxWidth: 1500,
        margin: "auto",
      }}
    >
      <Navigation routes={routes} />
      <div
        style={{
          maxWidth: 1000,
          width: "100%",
          height: `calc(100vh - ${dimensions.headerHeight}px)`,
          margin: "auto",
          padding: 16,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
