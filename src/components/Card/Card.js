import React from "react";
import DeleteIcon from "../Icons/DeleteIcon";

const initialState = {
  cardId: null,
  content: "",
  isHovering: false
};

class Card extends React.Component {
  state = initialState;

  componentDidMount() {
    const { card } = this.props;
    // card
    // -cardContent
    // -cardId
    // -listId
    // -created
    this.setState({ cardId: card.cardId, content: card.cardContent });
  }

  handleMouseHover = () => {
    this.setState(this.toggleHoverState);
  };

  toggleHoverState = state => {
    return {
      isHovering: !state.isHovering
    };
  };

  render() {
    return (
      <div
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {this.state.isHovering ? (
          <div>
            <div className="content">{this.state.content}</div>
            <DeleteIcon />
          </div>
        ) : (
          <div className="conent">{this.state.content}</div>
        )}
      </div>
    );
  }
}

export default Card;
