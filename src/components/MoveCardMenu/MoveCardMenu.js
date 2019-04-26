import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

const initialState = {
  moveToPosition: null,
  moveToList: null,
  availablePositions: [],
  availableLists: []
};

class MoveCardMenu extends React.Component {
  state = initialState;

  componentWillMount() {
    this.addPositions();
    this.addLists();
  }

  addPositions = () => {
    const list = this.props.lists.filter(
      list => list.listId === this.props.listId
    );
    const listLength = list[0].cards.length;
    let positions = Array.from(Array(listLength).keys());
    this.setState({
      availablePositions: positions,
      moveToPosition: this.props.cardPosition
    });
  };

  addLists = () => {
    let toList = "";
    const listNames = this.props.lists.map(list => {
      if (list.listId === this.props.listId) {
        toList = list.listName;
      }
      return list.listName;
    });

    this.setState({
      availableLists: listNames,
      moveToList: toList
    });
  };

  handleChange = event => {
    if (event.target.name === "move-position") {
      this.setState({ moveToPosition: event.target.value });
    } else if (event.target.name === "move-list") {
      this.setState({ moveToList: event.target.value });
    }
  };

  render() {
    const { classes } = this.props;
    const listPositions = this.state.availablePositions.map(position => {
      return (
        <MenuItem value={position} key={position}>
          <em>{position}</em>
        </MenuItem>
      );
    });
    const menuPositions = this.state.availableLists.map(position => {
      return (
        <MenuItem value={position} key={position}>
          <em>{position}</em>
        </MenuItem>
      );
    });
    return (
      <Card className={classes.moveCard}>
        <form className={classes.moveForm}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="move-list">List</InputLabel>
            <Select
              value={this.state.moveToList}
              onChange={this.handleChange}
              inputProps={{
                name: "move-list",
                id: "move-list"
              }}
            >
              {menuPositions}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="move-position">Position</InputLabel>
            <Select
              value={this.state.moveToPosition}
              onChange={this.handleChange}
              inputProps={{
                name: "move-position",
                id: "move-position"
              }}
            >
              {listPositions}
            </Select>
          </FormControl>
        </form>
        <Button
          className={classes.menuButton}
          onClick={() => {
            this.props.handleMoveCard(
              this.props.cardId,
              this.props.listId,
              this.state.moveToList,
              this.props.cardPosition,
              this.state.moveToPosition
            );
            this.props.handleCloseMove();
          }}
        >
          <Typography>Move</Typography>
        </Button>
      </Card>
    );
  }
}

MoveCardMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoveCardMenu);
