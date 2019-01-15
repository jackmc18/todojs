import React from "react";
import CardList from "../CardList/CardList";
import "./Board.css";

const initialState = {
  boardName: "Untitled",
  boardOwner: null,
  cardLists: ["To Do", "Doing", "Done"]
};

class Board extends React.Component {
  state = initialState;

  render() {
    const cardLists = this.state.cardLists.map(cardList => {
      return (
        <li className="card-list" key={cardList}>
          <CardList name={cardList} />
        </li>
      );
    });

    return (
      <div>
        <h3>Board</h3>
        <ul className="card-list">
          {cardLists}
          <li>
            <button className="pure-button pure-button-primary add-list">
              Add List
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Board;
