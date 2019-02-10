import React from "react";

const Dropdown = props => {
  const menuChildren = props.menuChildren.map((child, i) => {
    return (
      <ul key={i} className="pure-menu-children">
        <li className="pure-menu-item">
          <div>{child}</div>
        </li>
      </ul>
    );
  });

  return (
    <div>
      <ul className="edit-card pure-menu-item pure-menu-has-children pure-menu-allow-hover">
        {props.menuTitle}
        {menuChildren}
      </ul>
    </div>
  );
};

export default Dropdown;
