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
    if (this.props.match.params.id === "default") {
      this.setState({ cardLists: ["To Do", "Doing", "Done"] });
    }
  }

  onAddListToggle = () => {
    this.setState({ addListToggle: true });
  };

  onAddListConfirm = () => {
    this.setState({
      addListToggle: false,
      cardLists: [...this.state.cardLists, this.state.addListName]
    });
  };

  onAddListNameChange = event => {
    this.setState({ addListName: event.target.value });
  };

  render() {
    const cardLists = this.state.cardLists.map((cardList, index) => {
      return (
        <li className="card-list" key={index}>
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
