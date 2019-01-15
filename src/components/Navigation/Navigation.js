import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ isSignedIn, signOut }) => {
  if (isSignedIn)
    return (
      <div className="pure-menu pure-menu-horizontal">
        <a href="#" className="pure-menu-heading pure-menu-link">
          ORGANIZER
        </a>
        <ul className="pure-menu-list right">
          <li className="pure-menu-item">
            <Link to="/boardList" className="pure-menu-link">
              Boards
            </Link>
          </li>
          <li className="pure-menu-item">
            <Link to="/signin" className="pure-menu-link">
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    );

  return (
    <div className="pure-menu pure-menu-horizontal">
      <a href="#" className="pure-menu-heading pure-menu-link">
        ORGANIZER
      </a>
      <ul className="pure-menu-list right">
        <li className="pure-menu-item">
          <Link to="/register" className="pure-menu-link">
            Register
          </Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/signin" className="pure-menu-link">
            Sign In
          </Link>
        </li>
      </ul>
    </div>
  );

  // if (isSignedIn) {
  //   return (
  //     <nav>
  //       <Link to="/signin" onClick={signOut}>
  //         Sign Out
  //       </Link>
  //     </nav>
  //   );
  // } else {
  //   return (
  //     <nav>
  //       <Link to="/signin">SignIn</Link>
  //       <Link to="/register">Register</Link>
  //     </nav>
  //   );
  // }
};

export default Navigation;
