import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import BoardList from "./components/BoardList/BoardList";
import "./App.css";

const initialState = {
  route: "SignIn",
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

  render() {
    const { isSignedIn } = this.state;

    return (
      <BrowserRouter>
        <div>
          {/* <Navigation isSignedIn={isSignedIn} /> */}
          <Route
            path="/"
            exact
            render={props => <SignIn {...props} loadUser={this.loadUser} />}
          />
          <Route
            path="/register"
            render={props => <Register {...props} loadUser={this.loadUser} />}
          />
          <Route path="/boardList" component={BoardList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
