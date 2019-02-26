import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
//import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";

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
  }
};

const initialState = {
  cardId: null,
  content: "",
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
    const { cardId, content, position } = this.state;
    // card
    // -cardContent
    // -cardId
    // -cardPosition
    // -listId
    // -created
    if (
      card.cardId !== cardId ||
      card.cardContent !== content ||
      card.cardPosition !== position
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
    //console.log(event.currentTarget.parentElement.parentElement.parentElement);
    const anchor =
      event.currentTarget.parentElement.parentElement.parentElement;
    this.setState({
      popAnchorEl: anchor
    });
  };

  handleCloseEdit = () => {
    this.setState({
      popAnchorEl: null
    });
  };

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  onDeleteCard = () => {
    this.props.onDeleteCard(this.state.cardId);
  };

  render() {
    const { classes } = this.props;
    const { popAnchorEl } = this.state;
    const openEditPopper = Boolean(popAnchorEl);
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
                aria-owns={openEditPopper ? "edit-popper" : undefined}
                aria-haspopup="true"
                onClick={this.handleClickEdit}
              >
                <EditIcon className={classes.editIcon} />
              </IconButton>
            ) : null}
            <Popover
              id="edit-popper"
              open={openEditPopper}
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
                <Typography component="h3" variant="subtitle1">
                  {this.state.content}
                </Typography>
              </Card>
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
