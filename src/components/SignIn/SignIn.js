import React from "react";
import { Link, Redirect } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      isSignedIn: false
    };
  }
  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  saveAuthToken = token => {
    window.sessionStorage.setItem("token", token);
  };

  onSubmitSignIn = () => {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.userId && data.success === "true") {
          this.saveAuthToken(data.token);
          fetch(`http://localhost:3000/profile/${data.userId}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: data.token
            }
          })
            .then(resp => resp.json())
            .then(user => {
              if (user && user.email) {
                this.props.loadUser(user);
                this.setState({ isSignedIn: true });
              }
            });
        }
      });
  };

  render() {
    const { isSignedIn } = this.state;

    if (isSignedIn) {
      return <Redirect to="/boardList" />;
    }

    return (
      <article className="center">
        <main>
          <div>
            <form className="pure-form pure-form-stacked">
              <fieldset>
                <legend>Sign In</legend>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  placeholder="Email"
                  onChange={this.onEmailChange}
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onPasswordChange}
                />

                <input
                  type="button"
                  value="Sign in"
                  className="pure-button pure-button-primary"
                  onClick={this.onSubmitSignIn}
                />
              </fieldset>
            </form>
            <div>
              <Link to="/register" className="pure-button pure-button-primary">
                Register
              </Link>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
