import React from "react";
import "./BoardCard.css";

const BoardCard = ({ board }) => {
  return <span className="board-card pure-button">{board.board_name}</span>;
};

export default BoardCard;
