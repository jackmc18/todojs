import React from "react";
import { Redirect } from "react-router-dom";
import BoardCard from "../BoardCard/BoardCard";
import Button from "@material-ui/core/Button";

import CreateBoardDialog from "../CreateBoardDialog/CreateBoardDialog";

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

  handleOpenCreateBoardDialog = () => {
    this.setState({ createBoardFlag: true });
  };

  handleCloseCreateBoardDialog = () => {
    this.setState({ createBoardFlag: false });
  };

  onCreateBoardConfirm = newBoardName => {
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
          boardName: newBoardName
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
        <Button
          variant="outlined"
          onClick={this.handleOpenCreateBoardDialog}
          className="create-board"
        >
          Create Board
        </Button>
        <CreateBoardDialog
          open={this.state.createBoardFlag}
          onClose={this.handleCloseCreateBoardDialog}
          onCreateBoard={this.onCreateBoardConfirm}
        />
      </div>
    );
  }
}

export default BoardList;
