import React from "react";
import CardList from "../CardList/CardList";
import "./Board.css";

const initialState = {
  board: {
    boardId: null,
    boardName: "Untitled"
  },
  cardLists: [],
  addListToggle: false,
  addListName: ""
};

class Board extends React.Component {
  state = initialState;

  componentDidMount() {
    this.displayLists();
  }

  displayLists = () => {
    const { id } = this.props.match.params;
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/getboard/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          boardId: id
        })
      })
        .then(response => response.json())
        .then(board => {
          this.setState({
            board: { boardId: board.boardId, boardName: board.boardName },
            cardLists: board.lists
          });
        });
    }
  };

  onAddListToggle = () => {
    this.setState({ addListToggle: true });
  };

  onAddListConfirm = () => {
    this.setState({
      addListToggle: false
      // cardLists: [...this.state.cardLists, this.state.addListName]
    });
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/createlist/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          listName: this.state.addListName,
          boardId: this.state.board.boardId
        })
      })
        .then(resp => resp.json())
        .then(list => {
          this.setState({
            cardLists: [
              ...this.state.cardLists,
              { cards: [], listId: list.list_id, listName: list.list_name }
            ]
          });
        });
    }
  };

  onAddListNameChange = event => {
    this.setState({ addListName: event.target.value });
  };

  render() {
    const { board } = this.state;
    const cardLists = this.state.cardLists.map((cardList, index) => {
      return (
        <li className="card-list" key={index}>
          <CardList cardList={cardList} />
        </li>
      );
    });

    return (
      <div className="board-wrapper">
        <div className="scrolling-wrapper">
          <h3>{board.boardName}</h3>
          <div className="list-wrapper">
            <ul className="card-list">
              {cardLists}
              <li>
                {this.state.addListToggle ? (
                  <div className="add-list">
                    <input
                      className="add-list"
                      placeholder="List Name"
                      onChange={this.onAddListNameChange}
                    />
                    <button
                      onClick={this.onAddListConfirm}
                      className="pure-button pure-button-primary add-list"
                    >
                      Add List
                    </button>
                  </div>
                ) : (
                  <div className="add-list">
                    <button
                      onClick={this.onAddListToggle}
                      className="pure-button pure-button-primary add-list"
                    >
                      Add List
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
