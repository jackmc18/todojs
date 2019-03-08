import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";

import EditCardMenu from "../EditCardMenu/EditCardMenu";

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

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  onSaveCard = content => {
    this.handleCloseEdit();
    this.props.onEditCardContent(this.state.cardId, content);
  };

  onDeleteCard = () => {
    this.handleCloseEdit();
    this.props.onDeleteCard(this.state.cardId);
  };

  render() {
    const { classes } = this.props;
    const { editPopAnchorEl } = this.state;
    const openEditPopover = Boolean(editPopAnchorEl);
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
              <EditCardMenu
                onSaveCard={this.onSaveCard}
                onDeleteCard={this.onDeleteCard}
                content={this.state.content}
              />
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
