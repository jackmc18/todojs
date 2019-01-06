import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register'
import './App.css';
import { setSignInEmailField } from '../actions';

const initialState = {
  route: 'SignIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    joined: ''
  }
}

const mapStateToProps = state => {
  return {
    signInEmail: state.signIn.signInEmail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignInEmailChange: (event) => dispatch(setSignInEmailField(event.target.value))
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined
      }
    });
  }

  onRouteChange = (route) => {
    if (route === 'SignOut') {
      this.setState(initialState);
    } else if (route === 'Home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route })
  }

  render() {
    const { onSignInEmailChange } = this.props;
    const { isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'Home'
          ? <div>
            <h1>Home</h1>
          </div>
          : (
            route === 'SignIn'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} onSignInEmailChange={onSignInEmailChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
