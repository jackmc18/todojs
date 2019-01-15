import React from "react";
import { Redirect } from "react-router-dom";

class BoardList extends React.Component {
  state = {
    createBoardFlag: false
  };

  onCreateBoard = () => {
    this.setState({ createBoardFlag: true });
  };

  render() {
    const { createBoardFlag } = this.state;

    if (createBoardFlag) {
      return <Redirect to="/board" />;
    }

    return (
      <div>
        <h3>Board List</h3>
        <button
          className="pure-button pure-button-primary"
          onClick={this.onCreateBoard}
        >
          CreateBoard
        </button>
      </div>
    );
  }
}

export default BoardList;
