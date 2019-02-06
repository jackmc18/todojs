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

  onAddListNameChange = event => {
    this.setState({ addListName: event.target.value });
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
          listPosition: this.state.cardLists.length,
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

  onDeleteList = listId => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/deletelist/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          listId: listId
        })
      }).then(res => {
        if (res.status === 200) {
          this.setState({
            cardLists: this.state.cardLists.filter(list => {
              return list.listId !== listId;
            })
          });
        }
      });
    }
  };

  onAddCard = newCard => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/createcard`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          cardContent: newCard.cardContent,
          listId: newCard.listId,
          cardPosition: newCard.cardPosition
        })
      })
        .then(response => response.json())
        .then(card => {
          const newCardLists = this.state.cardLists.map(list => {
            if (list.listId === card.list_id) {
              list.cards = [
                ...list.cards,
                {
                  cardId: card.card_id,
                  listId: card.list_id,
                  cardContent: card.card_content,
                  cardPosition: card.card_position,
                  created: card.created
                }
              ];
            }
            return list;
          });
          this.setState({ cardLists: newCardLists });
        });
    }
  };

  render() {
    const { board } = this.state;
    const cardLists = this.state.cardLists.map((cardList, index) => {
      return (
        <li className="card-list" key={index}>
          <CardList
            cardList={cardList}
            onDeleteList={this.onDeleteList}
            onAddCard={this.onAddCard}
          />
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
