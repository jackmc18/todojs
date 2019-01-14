import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ isSignedIn, signOut }) => {
  if (isSignedIn) {
    return (
      <nav>
        <Link to="/" onClick={signOut}>
          Sign Out
        </Link>
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to="/">SignIn</Link>
        <Link to="/register">Register</Link>
      </nav>
    );
  }
};

export default Navigation;
