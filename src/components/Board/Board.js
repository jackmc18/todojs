import React from "react";
import CardList from "../CardList/CardList";
import "./Board.css";

const initialState = {
  boardName: "Untitled",
  boardId: null,
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
      fetch(`http://localhost:3000/getlists/`, {
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
        .then(lists => {
          this.setState({ boardId: id, cardLists: lists });
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
          boardId: this.state.boardId
        })
      });
    }
  };

  onAddListNameChange = event => {
    this.setState({ addListName: event.target.value });
  };

  render() {
    const cardLists = this.state.cardLists.map((cardList, index) => {
      return (
        <li className="card-list" key={index}>
          <CardList name={cardList.list_name} />
        </li>
      );
    });

    return (
      <div>
        <h3>Board</h3>
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
    );
  }
}

export default Board;
