import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginEmail: "",
      LoginPassword: "",
      isLoggedIn: false
    };
  }
  onEmailChange = event => {
    this.setState({ LoginEmail: event.target.value });
  };
  onPasswordChange = event => {
    this.setState({ LoginPassword: event.target.value });
  };

  saveAuthToken = token => {
    window.sessionStorage.setItem("token", token);
  };

  onSubmitLogin = event => {
    event.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.LoginEmail,
        password: this.state.LoginPassword
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
                this.setState({ isLoggedIn: true });
              }
            });
        }
      });
  };

  render() {
    const { isLoggedIn } = this.state;
    const { classes } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/boardList" />;
    }

    return (
      <div>
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  onChange={this.onEmailChange}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.onPasswordChange}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSubmitLogin}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Register
              </Button>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
