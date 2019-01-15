import React from "react";

class Card extends React.Component {
  render() {
    return <div>{this.props.content}</div>;
  }
}

export default Card;
