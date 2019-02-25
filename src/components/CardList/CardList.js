import React from "react";
import AppCard from "../AppCard/AppCard";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Dropdown from "../Dropdown/Dropdown";
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

  onDeleteList = () => {
    this.props.onDeleteList(this.state.listId);
  };

  render() {
    const { listName, cards } = this.state;

    const cardsMap = cards.map((card, index) => {
      return (
        <li key={index}>
          <AppCard
            className="card-class-name"
            card={card}
            onDeleteCard={this.props.onDeleteCard}
          />
        </li>
      );
    });

    return (
      <div className="list">
        <div className="list-header" style={{ position: "relative" }}>
          <h4>{listName}</h4>
          <Dropdown
            menuTitle={<MoreHorizIcon />}
            menuChildren={[<DeleteIcon onDeleteItem={this.onDeleteList} />]}
          />
        </div>
        <ul>{cardsMap}</ul>
        {this.state.addCardToggle ? (
          <div className="add-card">
            <textarea
              className="add-card"
              placeholder="Card Content"
              onChange={this.onAddCardNameChange}
            />
            <button onClick={this.onAddCardConfirm} className="">
              Add Card
            </button>
          </div>
        ) : (
          <div className="add-card">
            <button onClick={this.onAddCardToggle} className="">
              Add Card
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default CardList;
