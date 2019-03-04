import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

const styles = {
  nav: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const initialState = {
  menuOpen: false
};

class Navigation extends React.Component {
  state = initialState;

  onLogOut = event => {
    event.preventDefault();
    this.props.logOut();
    this.props.history.push("/login");
  };

  handleMenuToggle = () => {
    this.setState(state => ({ menuOpen: !state.open }));
  };

  handleMenuClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ menuOpen: false });
  };

  handleMenuSelectHome = event => {
    this.handleMenuClose(event);
    this.props.history.push("/");
  };

  handleMenuSelectBoards = event => {
    this.handleMenuClose(event);
    this.props.history.push("/boardlist");
  };

  render() {
    const { isLoggedIn, classes } = this.props;
    const { menuOpen } = this.state;

    return (
      <div className={classes.nav}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={menuOpen ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenuToggle}
            >
              <MenuIcon />
            </IconButton>
            <Popper
              open={menuOpen}
              anchorEl={this.anchorEl}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleMenuClose}>
                      <MenuList>
                        <MenuItem onClick={this.handleMenuSelectHome}>
                          Home
                        </MenuItem>
                        <MenuItem onClick={this.handleMenuSelectBoards}>
                          Boards
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              TODOJS
            </Typography>
            {isLoggedIn !== null ? (
              isLoggedIn ? (
                <Button onClick={this.onLogOut} color="inherit">
                  Log Out
                </Button>
              ) : (
                <Button onClick={this.onLogOut} color="inherit">
                  Log In
                </Button>
              )
            ) : null}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Navigation));
