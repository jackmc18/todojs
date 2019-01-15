import React from "react";
import { Link } from "react-router-dom";

const initialState = {
  boards: []
};

class BoardList extends React.Component {
  state = initialState;

  onCreateBoard = () => {
    this.setState({ createBoardFlag: true });
  };

  render() {
    return (
      <div>
        <h3>Board List</h3>
        <Link
          to={{ pathname: "/board/default" }}
          className="pure-button pure-button-primary"
        >
          CreateBoard
        </Link>
      </div>
    );
  }
}

export default BoardList;
