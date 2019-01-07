import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value })
  }
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value })
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('Home');
        }
      })

  }

  render() {
    const { onRouteChange, onSignInEmailChange } = this.props;
    return (
      <article className="center">
        <main>
          <div>
            <fieldset id="sign_up">
              <legend>Sign In</legend>
              <div>
                <label htmlFor="email-address">Email</label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                // onChange={onSignInEmailChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <label><input type="checkbox" /> Remember me</label>
            </fieldset>
            <div>
              <input
                // the arrow function allows for the onRouteChange to not be called on render
                onClick={this.onSubmitSignIn}
                type="submit"
                value="Sign in"
              />
            </div>
            <div>
              <p onClick={() => onRouteChange('Register')} href="#0">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }

}

export default SignIn;