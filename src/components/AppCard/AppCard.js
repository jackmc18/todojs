import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

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
  },
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
  cardId: null,
  content: "",
  editedContent: "",
  position: null,
  listId: null,
  isHovering: false,
  editPopAnchorEl: null,
  movePopAnchorEl: null
};

class AppCard extends React.Component {
  state = initialState;

  componentDidMount() {
    this.handleUpdateCardState();
  }

  componentDidUpdate() {
    this.handleUpdateCardState();
  }

  handleUpdateCardState = () => {
    const { card } = this.props;
    const { cardId, position, content } = this.state;
    // card
    // -cardContent
    // -cardId
    // -cardPosition
    // -listId
    // -created
    if (
      card.cardId !== cardId ||
      card.cardPosition !== position ||
      card.cardContent !== content
    ) {
      this.setState({
        cardId: card.cardId,
        content: card.cardContent,
        position: card.cardPosition,
        listId: card.listId
      });
    }
  };

  handleClickEdit = event => {
    const anchor =
      event.currentTarget.parentElement.parentElement.parentElement;
    const editedContent = this.state.content;
    this.setState({
      editPopAnchorEl: anchor,
      editedContent: editedContent
    });
  };

  handleCloseEdit = () => {
    this.setState({
      editPopAnchorEl: null,
      isHovering: false
    });
  };

  handleClickMove = event => {
    console.log(this.props.lists);
    this.setState({
      movePopAnchorEl: event.currentTarget
    });
  };

  handleCloseMove = () => {
    this.setState({ movePopAnchorEl: null });
  };

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  onEditCardContent = event => {
    this.setState({ editedContent: event.target.value });
  };

  onSaveCard = () => {
    this.handleCloseEdit();
    this.props.onEditCardContent(this.state.cardId, this.state.editedContent);
  };

  onDeleteCard = () => {
    this.handleCloseEdit();
    this.props.onDeleteCard(this.state.cardId);
  };

  render() {
    const { classes } = this.props;
    const { editPopAnchorEl, movePopAnchorEl } = this.state;
    const openEditPopover = Boolean(editPopAnchorEl);
    const openMovePopover = Boolean(movePopAnchorEl);
    return (
      <Card className={classes.card}>
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div>
            <Typography component="h3" variant="subtitle1">
              {this.state.content}
            </Typography>
            {this.state.isHovering ? (
              <IconButton
                className={classes.editIconButton}
                aria-owns={openEditPopover ? "edit-popover" : undefined}
                aria-haspopup="true"
                onClick={this.handleClickEdit}
              >
                <EditIcon className={classes.editIcon} />
              </IconButton>
            ) : null}
            <Popover
              id="edit-popover"
              open={openEditPopover}
              anchorEl={editPopAnchorEl}
              onClose={this.handleCloseEdit}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
            >
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
                  onClick={this.onSaveCard}
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
                        <InputLabel htmlFor="move-position">
                          Position
                        </InputLabel>
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
                </Popover>
                <Button
                  className={classes.menuButton}
                  onClick={this.onDeleteCard}
                >
                  <DeleteIcon />
                  <Typography>Delete</Typography>
                </Button>
              </div>
            </Popover>
          </div>
        </div>
      </Card>
    );
  }
}

AppCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppCard);
