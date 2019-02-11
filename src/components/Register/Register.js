import React from "react";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      isSignedIn: false
    };
  }

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = () => {
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.setState({ isSignedIn: true });
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
            <form className="">
              <fieldset>
                <legend>Register</legend>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onNameChange}
                />

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
                  value="Register"
                  className=""
                  onClick={this.onSubmitRegister}
                />
              </fieldset>
            </form>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
