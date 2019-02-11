import React from "react";
import { Link } from "react-router-dom";
import "./BoardCard.css";

const BoardCard = ({ board }) => {
  return (
    <div>
      <Link to={`/board/${board.board_id}`} className="board-card">
        {board.board_name}
      </Link>
    </div>
  );
};

export default BoardCard;
