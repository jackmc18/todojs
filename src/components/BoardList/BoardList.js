import React from "react";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import BoardCard from "../BoardCard/BoardCard";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import CreateBoardDialog from "../CreateBoardDialog/CreateBoardDialog";

const initialState = {
  boards: [],
  createBoardFlag: false,
  createBoardName: "",
  redirectToLogin: false,
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
      }).then(resp => {
        if (resp.status !== 401) {
          resp.json().then(data => {
            if (data.length) this.setState({ boards: data });
          });
        } else {
          this.setState({ redirectToLogin: true });
        }
      });
    } else {
      this.setState({ redirectToLogin: true });
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
      this.setState({ redirectToLogin: true });
    }
  };

  onSelectBoard = board => {
    this.props.history.push(`/board/${board.board_id}`);
  };

  render() {
    const {
      redirectToLogin,
      redirectToCreated,
      boards,
      createdId
    } = this.state;
    if (redirectToLogin) {
      return <Redirect to="/login" />;
    } else if (redirectToCreated) {
      return <Redirect to={`/board/${createdId}`} />;
    }
    return (
      <div className="board-list">
        <Typography component="h1" variant="h5">
          Boards
        </Typography>
        <div>
          {boards
            ? boards.map(board => (
                <BoardCard
                  key={board.board_id}
                  board={board}
                  onSelectBoard={this.onSelectBoard}
                />
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

export default withRouter(BoardList);
