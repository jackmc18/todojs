import React from "react";
import { Redirect } from "react-router-dom";
import BoardCard from "../BoardCard/BoardCard";
import "./BoardList.css";

const initialState = {
  boards: [],
  createBoardFlag: false,
  createBoardName: "",
  redirectToSignin: false,
  redirectToCreated: false,
  createdId: null
};

class BoardList extends React.Component {
  state = initialState;

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/boardlist/`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.length) this.setState({ boards: data });
        });
    } else {
      this.setState({ redirectToSignin: true });
    }
  };

  onCreateBoardToggle = () => {
    this.setState({ createBoardFlag: true });
  };

  onCreateBoardConfirm = () => {
    this.setState({
      createBoardToggle: false
      // boards: [...this.state.boards, this.state.createBoardName]
    });
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/createboard/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          boardName: this.state.createBoardName
        })
      })
        .then(resp => resp.json())
        .then(boardId => {
          this.setState({ createdId: boardId, redirectToCreated: true });
        });
    } else {
      this.setState({ redirectToSignin: true });
    }
  };

  onCreateBoardNameChange = event => {
    this.setState({ createBoardName: event.target.value });
  };

  render() {
    const {
      redirectToSignin,
      redirectToCreated,
      boards,
      createdId
    } = this.state;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    } else if (redirectToCreated) {
      return <Redirect to={`/board/${createdId}`} />;
    }
    return (
      <div className="board-list">
        <h3>Board List</h3>
        <div>
          {boards
            ? boards.map(board => (
                <BoardCard key={board.board_id} board={board} />
              ))
            : null}
        </div>
        {this.state.createBoardFlag ? (
          <div className="create-board">
            <input
              className="create-board"
              placeholder="Board Name"
              onChange={this.onCreateBoardNameChange}
            />
            <button
              onClick={this.onCreateBoardConfirm}
              className="create-board"
            >
              CreateBoard
            </button>
          </div>
        ) : (
          <div className="create-board">
            <button onClick={this.onCreateBoardToggle} className="create-board">
              CreateBoard
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default BoardList;
