import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ isSignedIn, signOut }) => {
  if (isSignedIn) {
    return (
      <nav>
        <Link to="/signin" onClick={signOut}>
          Sign Out
        </Link>
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to="/signin">SignIn</Link>
        <Link to="/register">Register</Link>
      </nav>
    );
  }
};

export default Navigation;
