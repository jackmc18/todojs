import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./CreateBoard.css";

const initialState = {
  boards: [],
  createBoardFlag: false,
  createBoardName: "",
  redirect: false
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
          this.setState({ boards: data });
          this.displayBoards();
        });
    } else {
      this.setState({ redirect: true });
    }
  };

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

  displayBoards = () => {
    console.log("displaying boards");
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/signin" />;
    }
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
