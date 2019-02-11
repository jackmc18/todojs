import React from "react";

class Dropdown extends React.Component {
  state = {
    menuOpen: false,
    menuChildren: []
  };

  componentDidMount() {
    this.loadChildren();
  }

  loadChildren = () => {
    this.setState({
      menuChildren: this.props.menuChildren.map((child, i) => {
        return (
          <ul key={i} className="">
            <li className="">
              <div>{child}</div>
            </li>
          </ul>
        );
      })
    });
  };

  onMenuOpen = () => {
    this.setState({ menuOpen: true });
  };

  render() {
    return (
      <div>
        <ul className="edit-card">
          <div onClick={this.onMenuOpen}>{this.props.menuTitle}</div>
          {this.state.menuOpen ? this.state.menuChildren : null}
        </ul>
      </div>
    );
  }
}

export default Dropdown;
