import React from "react";

const initialState = {
  cardId: null,
  content: ""
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

  render() {
    return <div>{this.state.content}</div>;
  }
}

export default Card;
