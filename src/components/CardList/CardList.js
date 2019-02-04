import React from "react";
import Card from "../Card/Card";
import "./CardList.css";

const initialState = {
  listName: "",
  listId: null,
  cards: [],
  addCardToggle: false,
  addCardContent: ""
};

class CardList extends React.Component {
  state = initialState;

  componentDidMount() {
    this.setState({
      cards: this.props.cardList.cards,
      listName: this.props.cardList.listName,
      listId: this.props.cardList.listId
    });
  }

  onAddCardToggle = () => {
    this.setState({ addCardToggle: true });
  };

  onAddCardConfirm = () => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/createcard`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          cardContent: this.state.addCardContent,
          listId: this.props.cardList.listId
        })
      })
        .then(response => response.json())
        .then(card => {
          this.setState({
            addCardContent: "",
            addCardToggle: false,
            cards: [
              ...this.state.cards,
              {
                cardContent: card.card_content,
                cardId: card.card_id,
                created: card.created,
                listId: card.list_id
              }
            ]
          });
        });
    }
  };

  onAddCardNameChange = event => {
    this.setState({ addCardContent: event.target.value });
  };

  render() {
    const { listName, cards } = this.state;

    const cardsMap = cards.map((card, index) => {
      return (
        <li key={index}>
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
            <textarea
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
