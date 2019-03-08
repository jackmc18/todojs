import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MoveCardMenu from "../MoveCardMenu/MoveCardMenu";

const styles = {
  card: {
    minWidth: 200,
    maxWidth: 275,
    minHeight: 30,
    padding: 3,
    marginBottom: 5,
    position: "relative"
  },
  editCard: {
    width: 265,
    minHeight: 30,
    padding: 3
  },
  editIconButton: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 10,
    width: 10
  },
  editIcon: {
    position: "absolute",
    height: 16,
    width: 16
  },
  editMenu: {
    display: "flex",
    justifyContent: "space-between"
  },
  menuButton: {
    width: 80,
    margin: 3
  },
  editCardContent: {
    width: "100%"
  }
};

const initialState = {
  editedContent: "",
  movePopAnchorEl: null
};

class EditCardMenu extends React.Component {
  state = initialState;

  componentDidMount() {
    this.setState({ editedContent: this.props.content });
  }

  onEditCardContent = event => {
    this.setState({ editedContent: event.target.value });
  };

  handleClickMove = event => {
    this.setState({
      movePopAnchorEl: event.currentTarget
    });
  };

  handleCloseMove = () => {
    this.setState({ movePopAnchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { movePopAnchorEl } = this.state;
    const openMovePopover = Boolean(movePopAnchorEl);
    return (
      <div>
        <Card className={classes.editCard}>
          <TextField
            id="edit-card-field"
            name="edit"
            className={classes.editCardContent}
            value={this.state.editedContent}
            label="Card Content"
            multiline
            variant="filled"
            onChange={this.onEditCardContent}
          />
        </Card>
        <div className={classes.editMenu}>
          <Button
            className={classes.menuButton}
            onClick={() => this.props.onSaveCard(this.state.editedContent)}
          >
            <SaveIcon />
            <Typography>Save</Typography>
          </Button>
          <Button
            className={classes.menuButton}
            aria-owns={openMovePopover ? "move-popover" : undefined}
            aria-haspopup="true"
            onClick={this.handleClickMove}
          >
            <ArrowRightAltIcon />
            <Typography>Move</Typography>
          </Button>
          <Popover
            id="move-popover"
            open={openMovePopover}
            anchorEl={movePopAnchorEl}
            onClose={this.handleCloseMove}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <MoveCardMenu cardPosition={this.props.cardPosition} />
          </Popover>
          <Button
            className={classes.menuButton}
            onClick={this.props.onDeleteCard}
          >
            <DeleteIcon />
            <Typography>Delete</Typography>
          </Button>
        </div>
      </div>
    );
  }
}

EditCardMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditCardMenu);
