import React from "react";
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";
import Dropdown from "../Dropdown/Dropdown";
import "./Card.css";

const initialState = {
  cardId: null,
  content: "",
  position: null,
  listId: null,
  isHovering: false
};

class Card extends React.Component {
  state = initialState;

  componentDidMount() {
    this.handleUpdateCardState();
  }

  componentDidUpdate() {
    this.handleUpdateCardState();
  }

  handleUpdateCardState = () => {
    const { card } = this.props;
    const { cardId, content, position } = this.state;
    // card
    // -cardContent
    // -cardId
    // -cardPosition
    // -listId
    // -created
    if (
      card.cardId !== cardId ||
      card.cardContent !== content ||
      card.cardPosition !== position
    ) {
      this.setState({
        cardId: card.cardId,
        content: card.cardContent,
        position: card.cardPosition,
        listId: card.listId
      });
    }
  };

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  onDeleteCard = () => {
    this.props.onDeleteCard(this.state.cardId);
  };

  render() {
    return (
      <div
        className="card"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="content" style={{ position: "relative" }}>
          {this.state.content}
          {this.state.isHovering ? (
            <Dropdown
              menuTitle={<EditIcon />}
              menuChildren={[<DeleteIcon onDeleteItem={this.onDeleteCard} />]}
            />
          ) : // <ul className="edit-card pure-menu-item pure-menu-has-children pure-menu-allow-hover">
          //   <EditIcon />
          //   <ul className="pure-menu-children">
          //     <li className="pure-menu-item">
          //       <div
          //         onClick={() => this.props.onDeleteCard(this.state.cardId)}
          //       >
          //         <DeleteIcon />
          //       </div>
          //     </li>
          //   </ul>
          // </ul>
          null
          //<div className="content">{this.state.content}</div>
          }
        </div>
      </div>
    );
  }
}

export default Card;
