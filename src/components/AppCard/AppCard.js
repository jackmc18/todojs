import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
    float: "right"
  },
  editCardContent: {
    width: "100%"
  }
};

const initialState = {
  cardId: null,
  content: "",
  editedContent: "",
  position: null,
  listId: null,
  isHovering: false,
  popAnchorEl: null
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
      popAnchorEl: anchor,
      editedContent: editedContent
    });
  };

  handleCloseEdit = () => {
    this.setState({
      popAnchorEl: null,
      isHovering: false
    });
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
    //this.setState({ content: this.state.editedContent });
    this.props.onEditCardContent(this.state.cardId, this.state.editedContent);
  };

  onDeleteCard = () => {
    this.handleCloseEdit();
    this.props.onDeleteCard(this.state.cardId);
  };

  render() {
    const { classes } = this.props;
    const { popAnchorEl } = this.state;
    const openEditPopover = Boolean(popAnchorEl);
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
                aria-owns={openEditPopover ? "edit-popper" : undefined}
                aria-haspopup="true"
                onClick={this.handleClickEdit}
              >
                <EditIcon className={classes.editIcon} />
              </IconButton>
            ) : null}
            <Popover
              id="edit-popper"
              open={openEditPopover}
              anchorEl={popAnchorEl}
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
              <Button onClick={this.onSaveCard}>
                <SaveIcon />
                <Typography>Save</Typography>
              </Button>
              <div className={classes.editMenu}>
                <Button onClick={this.onDeleteCard}>
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
