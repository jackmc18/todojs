import React from "react";
import Card from "../Card/Card";
import "./CardList.css";

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
    const { listName, cards } = this.props.cardList;
    // cardList
    // -listId
    // -listName
    // -cards
    console.log(this.props.cardList);
    const cardsMap = cards.map((card, index) => {
      return (
        <li className="cards" key={index}>
          <Card card={card} />
        </li>
      );
    });

    return (
      <div className="list">
        <h4>{listName}</h4>
        <ul>{cardsMap}</ul>
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
