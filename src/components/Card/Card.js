import React from "react";
import DeleteIcon from "../Icons/DeleteIcon";
import "./Card.css";

const initialState = {
  cardId: null,
  content: "",
  isHovering: false
};

class Card extends React.Component {
  state = initialState;

  componentDidMount() {
    const { card } = this.props;
    // card
    // -cardContent
    // -cardId
    // -listId
    // -created
    this.setState({ cardId: card.cardId, content: card.cardContent });
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  handleDeleteCard = () => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/deletecard/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          cardId: this.state.cardId
        })
      }).then(() => {
        console.log("finished");
        this.props.onDeleteCard(this.state.cardId);
      });
    }
  };

  render() {
    return (
      <div
        className="card"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.state.isHovering ? (
          <div style={{ position: "relative" }}>
            <div className="content">{this.state.content}</div>
            <div onClick={() => this.handleDeleteCard()} className="edit-card">
              <DeleteIcon />
            </div>
          </div>
        ) : (
          <div className="conent">{this.state.content}</div>
        )}
      </div>
    );
  }
}

export default Card;
