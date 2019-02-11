import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ isSignedIn, signOut }) => {
  if (isSignedIn)
    return (
      <div className="">
        <Link to="/" className="">
          ORGANIZER
        </Link>
        <ul className="">
          <li className="">
            <Link to="/boardList" className="">
              Boards
            </Link>
          </li>
          <li className="">
            <Link to="/signin" onClick={signOut} className="">
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    );

  return (
    <div className="">
      <Link to="/" className="">
        ORGANIZER
      </Link>
      <ul className="">
        <li className="">
          <Link to="/register" className="">
            Register
          </Link>
        </li>
        <li className="">
          <Link to="/signin" className="">
            Sign In
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
