import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import BoardList from "./components/BoardList/BoardList";
import Board from "./components/Board/Board";

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

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

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
    const { isSignedIn } = this.state;

    return (
      <BrowserRouter>
        <div>
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
          <Route path="/boardList" component={BoardList} />
          <Route path="/board" component={Board} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
