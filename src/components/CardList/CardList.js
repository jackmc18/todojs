import React from "react";
import Card from "../Card/Card";
import DeleteIcon from "../Icons/DeleteIcon";
import HorizTripDotIcon from "../Icons/HorizTripDotIcon";
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
    this.handleUpdateListState();
  }

  componentDidUpdate() {
    this.handleUpdateListState();
  }

  handleUpdateListState = () => {
    const { cardList } = this.props;
    const { listId, listName, cards } = this.state;
    if (
      cardList.listId !== listId ||
      cardList.listName !== listName ||
      cardList.cards !== cards
    ) {
      this.setState({
        cards: cardList.cards,
        listName: cardList.listName,
        listId: cardList.listId,
        addCardToggle: false,
        addCardContent: ""
      });
    }
  };

  onAddCardToggle = () => {
    this.setState({ addCardToggle: true });
  };

  onAddCardConfirm = () => {
    const newCard = {
      cardContent: this.state.addCardContent,
      listId: this.state.listId,
      cardPosition: this.state.cards.length
    };
    this.props.onAddCard(newCard);
  };

  onAddCardNameChange = event => {
    this.setState({ addCardContent: event.target.value });
  };

  render() {
    const { listName, listId, cards } = this.state;

    const cardsMap = cards.map((card, index) => {
      return (
        <li key={index}>
          <Card card={card} onDeleteCard={this.props.onDeleteCard} />
        </li>
      );
    });

    return (
      <div className="list">
        <div className="list-header" style={{ position: "relative" }}>
          <h4>{listName}</h4>
          <ul className="edit-card pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <HorizTripDotIcon />
            <ul className="pure-menu-children">
              <li className="pure-menu-item">
                <div onClick={() => this.props.onDeleteList(listId)}>
                  <DeleteIcon />
                </div>
              </li>
            </ul>
          </ul>
        </div>
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
