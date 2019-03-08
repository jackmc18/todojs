import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = {
  moveCard: {
    width: 265,
    minHeight: 30,
    padding: 3
  },
  moveForm: {
    display: "flex",
    justifyContent: "space-between"
  },
  formControl: {
    margin: 3,
    minWidth: 100
  }
};

const initialState = {};

class MoveCardMenu extends React.Component {
  state = initialState;

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.moveCard}>
        <form className={classes.moveForm}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="move-list">List</InputLabel>
            <Select
              value=""
              inputProps={{
                name: "move-list",
                id: "move-list"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="move-position">Position</InputLabel>
            <Select
              value=""
              inputProps={{
                name: "move-position",
                id: "move-position"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            </Select>
          </FormControl>
        </form>
      </Card>
    );
  }
}

MoveCardMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoveCardMenu);
