import React from "react";
import CardList from "../CardList/CardList";

const initialState = {
  boardName: "Untitled",
  boardOwner: null,
  cardLists: ["To Do", "Doing", "Done"]
};

class Board extends React.Component {
  state = initialState;

  render() {
    const cardLists = this.state.cardLists.map(cardList => {
      return <CardList name={cardList} />;
    });

    return (
      <div>
        <h3>Board</h3>
        {cardLists}
      </div>
    );
  }
}

export default Board;
