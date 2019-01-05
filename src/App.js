import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import './App.css';

const initialState = {
  route: 'SignIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
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
              ? <div>
                <h1>SignIn</h1>
              </div>
              : <div>
                <h1>Register</h1>
              </div>
          )
        }
      </div>
    );
  }
}

export default App;
