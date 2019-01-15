import React from "react";
import Card from "../Card/Card";

const initialState = {
  cards: []
};

class CardList extends React.Component {
  state = initialState;

  render() {
    const { name } = this.props;
    return (
      <div>
        <h4>{name}</h4>
        <button className="pure-button pure-button-primary">Add Card</button>
      </div>
    );
  }
}

export default CardList;
