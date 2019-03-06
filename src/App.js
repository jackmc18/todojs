import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";

import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import BoardList from "./components/BoardList/BoardList";
import Board from "./components/Board/Board";

const initialState = {
  isLoggedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    joined: ""
  }
};

const styles = theme => ({});

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://localhost:3000/profile/${data.id}`, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            })
              .then(resp => resp.json())
              .then(user => {
                if (user && user.email) {
                  this.loadUser(user);
                }
              });
          }
        })
        .catch(console.log);
    }
  };

  loadUser = data => {
    this.setState({
      isLoggedIn: true,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined
      }
    });
  };

  onLogOut = () => {
    window.sessionStorage.removeItem("token");
    this.setState({
      isLoggedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        joined: ""
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { isLoggedIn, user } = this.state;

    return (
      <div className={classes.root}>
        <BrowserRouter>
          <div className="app-container">
            <Navigation isLoggedIn={isLoggedIn} logOut={this.onLogOut} />
            <Route path="/" exact component={Home} />
            <Route
              path="/login"
              exact
              render={props => <Login {...props} loadUser={this.loadUser} />}
            />
            <Route
              path="/register"
              render={props => <Register {...props} loadUser={this.loadUser} />}
            />
            <Route
              path="/boardList"
              render={props => <BoardList {...props} user={user} />}
            />
            <Route name="board" path="/board/:id" component={Board} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(App));
