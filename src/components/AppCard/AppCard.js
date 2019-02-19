import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";
import Dropdown from "../Dropdown/Dropdown";

import Card from "@material-ui/core/Card";

const styles = {
  card: {
    minWidth: 200,
    maxWidth: 275,
    minHeight: 30
  }
};

const initialState = {
  cardId: null,
  content: "",
  position: null,
  listId: null,
  isHovering: false
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
    return (
      <Card className={classes.card}>
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div>
            {this.state.content}
            {this.state.isHovering ? (
              <Dropdown
                menuTitle={<EditIcon />}
                menuChildren={[<DeleteIcon onDeleteItem={this.onDeleteCard} />]}
              />
            ) : null}
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
