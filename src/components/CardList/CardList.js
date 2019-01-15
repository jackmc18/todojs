import React from "react";
import Card from "../Card/Card";

const initialState = {
  cards: [],
  addCardToggle: false,
  addCardContent: ""
};

class CardList extends React.Component {
  state = initialState;

  onAddCardToggle = () => {
    this.setState({ addCardToggle: true });
  };

  onAddCardConfirm = () => {
    this.setState({
      addCardToggle: false,
      cards: [...this.state.cards, this.state.addCardContent]
    });
  };

  onAddCardNameChange = event => {
    this.setState({ addCardContent: event.target.value });
  };

  render() {
    const { name } = this.props;

    const cards = this.state.cards.map((card, index) => {
      return (
        <li className="cards" key={index}>
          <Card content={card} />
        </li>
      );
    });

    return (
      <div>
        <h4>{name}</h4>
        <ul>{cards}</ul>
        {this.state.addCardToggle ? (
          <div className="add-card">
            <input
              className="add-card"
              placeholder="Card Content"
              onChange={this.onAddCardNameChange}
            />
            <button
              onClick={this.onAddCardConfirm}
              className="pure-button pure-button-primary"
            >
              Add Card
            </button>
          </div>
        ) : (
          <div className="add-card">
            <button
              onClick={this.onAddCardToggle}
              className="pure-button pure-button-primary"
            >
              Add Card
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default CardList;
