import React from "react";
import DeleteIcon from "../Icons/DeleteIcon";
import "./Card.css";

const initialState = {
  cardId: null,
  content: "",
  position: null,
  isHovering: false
};

class Card extends React.Component {
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
        position: card.cardPosition
      });
    }
  };

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  render() {
    return (
      <div
        className="card"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.state.isHovering ? (
          <div style={{ position: "relative" }}>
            <div className="content">{this.state.content}</div>
            <div
              onClick={() => this.props.onDeleteCard(this.state.cardId)}
              className="edit-card"
            >
              <DeleteIcon />
            </div>
          </div>
        ) : (
          <div className="conent">{this.state.content}</div>
        )}
      </div>
    );
  }
}

export default Card;
