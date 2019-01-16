import React from "react";
import { Link } from "react-router-dom";

const initialState = {
  boards: [],
  createBoardFlag: false,
  createBoardName: ""
};

class BoardList extends React.Component {
  state = initialState;

  onCreateBoardToggle = () => {
    this.setState({ createBoardFlag: true });
  };

  onCreateBoardConfirm = () => {
    this.setState({
      createBoardToggle: false,
      boards: [...this.state.boards, this.state.createBoardName]
    });
  };

  onCreateBoardNameChange = event => {
    this.setState({ createBoardName: event.target.value });
  };

  render() {
    return (
      <div>
        <h3>Board List</h3>
        {this.state.createBoardFlag ? (
          <div className="create-board">
            <input
              className="create-board"
              placeholder="Board Name"
              onChange={this.onCreateBoardNameChange}
            />
            <Link
              onClick={this.onCreateBoardConfirm}
              to={{ pathname: `/board/${this.state.createBoardName}` }}
              className="pure-button pure-button-primary"
            >
              CreateBoard
            </Link>
          </div>
        ) : (
          <div className="create-board">
            <button
              onClick={this.onCreateBoardToggle}
              className="pure-button pure-button-primary"
            >
              CreateBoard
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default BoardList;
