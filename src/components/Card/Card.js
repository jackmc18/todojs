import React from "react";

const initialState = {
  content: ""
};

class Card extends React.Component {
  state = initialState;

  componentDidMount() {
    const { card } = this.props;
    // card
    // -card_content
    // -card_id
    // -list_id
    // -created
    this.setState({ content: card.card_content });
  }

  render() {
    return <div>{this.state.content}</div>;
  }
}

export default Card;
