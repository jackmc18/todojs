import React from "react";

class Dropdown extends React.Component {
  state = {
    menuOpen: false,
    menuChildren: []
  };

  componentDidMount() {
    this.setState({
      menuChildren: this.props.menuChildren.map((child, i) => {
        return (
          <ul key={i} className="pure-menu-children">
            <li className="pure-menu-item">
              <div>{child}</div>
            </li>
          </ul>
        );
      })
    });
  }

  render() {
    return (
      <div>
        <ul className="edit-card pure-menu-item pure-menu-has-children pure-menu-allow-hover">
          {this.props.menuTitle}
          {this.state.menuChildren}
        </ul>
      </div>
    );
  }
}

export default Dropdown;
