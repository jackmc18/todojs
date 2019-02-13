import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import BoardList from "./components/BoardList/BoardList";
import Board from "./components/Board/Board";

import withRoot from "./withRoot";
import "./App.css";

const initialState = {
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    joined: ""
  }
};

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 20
  }
});

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
      fetch("http://localhost:3000/signin", {
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
      isSignedIn: true,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined
      }
    });
  };

  onSignOut = () => {
    this.setState({
      isSignedIn: false,
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
    const { isSignedIn, user } = this.state;

    return (
      <div className={classes.root}>
        <BrowserRouter>
          <div className="app-container">
            <Navigation isSignedIn={isSignedIn} signOut={this.onSignOut} />
            <Route path="/" exact component={Home} />
            <Route
              path="/signin"
              exact
              render={props => <SignIn {...props} loadUser={this.loadUser} />}
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
