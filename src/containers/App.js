import React, { Component } from "react";
import { connect } from "react-redux";
import SignIn from "../components/SignIn/SignIn";
import "./App.css";
import { setSignInEmailField } from "../actions";

const mapStateToProps = state => {
  return {
    signInEmailField: state.signIn.signInEmailField
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignInEmailChange: event =>
      dispatch(setSignInEmailField(event.target.value))
  };
};

class App extends Component {
  render() {
    const { onSignInEmailChange } = this.props;
    return (
      <div>
        <SignIn signInEmailChange={onSignInEmailChange} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
