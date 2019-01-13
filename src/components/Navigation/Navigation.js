import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav>
        <p onClick={() => onRouteChange("SignOut")}>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav>
        <p onClick={() => onRouteChange("SignIn")}>Sign In</p>
        <p onClick={() => onRouteChange("Register")}>Register</p>
      </nav>
    );
  }
};

export default Navigation;
